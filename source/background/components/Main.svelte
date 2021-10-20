<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { settingsDisplays } from "../../shared/constants";
    import type { MessageHandlers, Settings, SettingsCategory } from "../../shared/types";
    import { AsyncRequest, pingRequest, SyncContentRequest, SyncContentRequestRaw, SyncContentResponse, WritableWrapper } from "../../shared/types_new";
    import { extensionLog, initializeStore, messageProcessHandlers, pingTabReady, sendRequestContentAsync, sleep } from "../../shared/utilities_new";
    import { domainMatches } from "../../shared/constants_new";

    const self = "background_main";
    let notifications: { [key: string]: string } = {};
    let queuedRequests: SyncContentRequest[] = [];
    let executing: boolean = false; // Whether execution is currently happening
    // Initialize writables beforehand to prevent errors
    let settings: WritableWrapper<Settings>;
    let settings_store: Writable<Settings>; // For $ referencing

    // Execute queued requests sync on stimulus from message handler
    async function performSyncRequests() {
        // Only want one instance running at a time, use pseudo-lock
        if(executing === true) {
            return; 
        }
        executing = true; // Lock running instance

        // Perform queued requests sync while they exist, and resolve each
        while(queuedRequests.length > 0) {
            // Initialize queued request and default response for given request
            const queuedRequest = queuedRequests.shift() as SyncContentRequest;
            const queuedResponse: SyncContentResponse = {
                result: "not-found",
                payload: undefined,
                execute: [],
            };

            const serializedRequest = JSON.stringify(queuedRequest);
            extensionLog(self, `Executing queued sequential request with body ${serializedRequest}`);

            // Check whether tabs matching given URL match exist
            const urlGlob = domainMatches[queuedRequest?.urlMatch];
            const matchingTabs = await browser.tabs.query({ 
                url: domainMatches[queuedRequest?.urlMatch],
                discarded: false, // Can't communicate with unloaded tab
                // status: "loading" // Can't communicate with loading tab
            });
            if(matchingTabs.length === 0) {
                extensionLog(self, `Couldn't find matching browser tabs with URL glob ${urlGlob}, resolving with not-found response`);

                // Perform execution depending on setting
                // For now, resolve with undefined but maybe open tab?
                queuedRequest.resolve(queuedResponse);
            }

            // Iterate over tabs and attempt communication
            let retryRequest = false;
            for(const tab of matchingTabs) {
                extensionLog(self, `Attempting to ping tab with ID ${tab.id} and URL ${tab.url}`);

                // Perform ping and check whether tab responds
                const pingResponse = await sendRequestContentAsync(tab.id as number, pingRequest);
                if(pingResponse === undefined || typeof pingResponse === "string") { // Failed to communicate with tab
                    extensionLog(self, `Error pinging content script: ${pingResponse}`);

                    continue;
                }

                extensionLog(self, `Received successful ping response, broadcasting request`);

                // Tab properly responded to ping, send actual request
                const request: AsyncRequest = {
                    type: "async",
                    handler: queuedRequest.handler,
                    args: queuedRequest.args,
                }; // Mirror request from queued parameters
                const response = await sendRequestContentAsync(tab.id as number, request);
                if(response === undefined || typeof response === "string") { // Failed to communicate with tab
                    // Should never happen since ping was successful
                    throw new Error(`error communicating after ping: ${response}`)
                }
                queuedResponse.result = "ok";
                queuedResponse.payload = response;

                // Check whether tab responded with request for execution
                if(response.payload.execute !== undefined) {
                    extensionLog(self, `Response received, performing execution handlers ${response.payload.execute}`);

                    if(response.payload.execute.includes("reload")) {
                        extensionLog(self, `Executing reload for tab with ID ${tab.id}`);

                        // Reload current tab, idle until reloading complete (ping successful)
                        await browser.tabs.reload(tab.id as number);
                        await sleep(2500); // Give a few seconds for the reload to initialize
                        await pingTabReady(tab.id as number, $settings_store["global"]["pollingInerval"] as number);
                    }
                    if(response.payload.execute.includes("retry")) {
                        extensionLog(self, `Executing retry, re-pushing request to back of queue`);

                        // Push queued request to back for retry
                        queuedRequests.push(queuedRequest);

                        retryRequest = true;
                    }
                } else {
                    extensionLog(self, `Response received, no execution handler necessary`);
                }

                break; // Stop sending requests after successful
            }

            // Moved retry handler down since JS/TS doesn't have goto
            if(retryRequest === true) {
                continue;
            }

            const serializedResponse = JSON.stringify(queuedResponse);
            extensionLog(self, `Finished processing queued request, responding with body ${serializedResponse}`);

            // Resolve with either payload or not found
            queuedRequest.resolve(queuedResponse);
        }

        executing = false; // Unlock running instance
    }

    // Add a sync request to queued and idle until response
    async function addSyncRequest(newRequest: SyncContentRequestRaw): Promise<SyncContentResponse> {
        extensionLog(self, `Pushing request to back of queue for sync execution`);
        
        // Push new request to existing queue and wait for completion
        return new Promise((resolve) => {
            // Construct and add queued request
            const queuedRequest: SyncContentRequest = {
                ...newRequest,
                resolve, 
            }; // Will block until resolution
            queuedRequests.push(queuedRequest);
            performSyncRequests(); // Runs asynchronously, wait for resolve
        });
    }

    // Creates new tab with specified URL and block until ready
    async function createTabReady(url: string, wait: boolean = true) {
        // Initialize and periodically ping until response
        const tab = await browser.tabs.create({
            active: false,
            url,
        });
        
        // Only wait for load complete if desired
        if(wait === true) {
            await pingTabReady(tab.id as number, $settings_store["global"]["pollingInerval"] as number);
        }
    }

    // Play corresponding notification sound and show notification
    async function soundNotification(
        soundKey: string, title: string, message: string, settingKeys: [string, string], buttons?: string[]
    ): Promise<string | undefined> {
        // Show desktop notification through API if desired
        let notificationId: string | undefined;
        if($settings_store[settingKeys[0]][settingKeys[1]] === true) {
            // Can't use webextension-polyfill because of lack of promise support
            notificationId = await new Promise((resolve) => {
                // Of course Chrome doesn't support async/await 
                chrome.notifications.create({
                    type: "basic",
                    title: title,
                    message: message,
                    iconUrl: "../resources/icon_512_dark.png",
                    buttons: buttons?.map(title => ({ title: title })),
                }, function(id: string) {
                    resolve(id);
                });
            });

            // Automatically clear after settings duration
            setTimeout(() => { 
                chrome.notifications.clear(notificationId as string); 
            }, $settings_store["global"]["durationNotification"] as number);
        }

        // Always play notification sound with given key if desired
        // Re-initialize from file vs. using existing Audio for simultaneous playing
        if($settings_store["global"]["playNotifications"] === true) {
            const notificationSound = new Audio(notifications[soundKey]);
            notificationSound.play();
        }

        return notificationId;
    }

    // Async doesn't include destructor, don't care
    onMount(async function() {
        // Initialize stores from Storage API
        settings = await initializeStore<Settings>( "settings", {});
        settings_store = settings.store;

        // Load notification sounds from resource file for playing
        notifications = {
            "success": "../resources/notification_success.mp3",
            "failure": "../resources/notification_queue.mp3",
            "error": "../resources/notification_ratelimit.mp3",
            // Best Buy
            "queue": "../resources/notification_queue.mp3",
        };

        extensionLog(self, "Merging stored settings with extension display values");

        // Source of truth: merge settings with defaults and possibly newly added
        // Doesn't currently delete obsolete settings but whatever honestly
        for(const [categoryKey, categoryData] of Object.entries(settingsDisplays)) {
            // Check whether the given settings category exists
            const storedCategorySettings = $settings_store[categoryKey];
            if(storedCategorySettings !== undefined) {
                // Category exists, iterate over and merge settings
                let categoryModified = false;
                for(const [settingKey, settingData] of Object.entries(categoryData.settings)) {
                    // Replace with default if setting doesn't exist or is wrong type
                    const storedSettingValue = storedCategorySettings[settingKey];
                    if(storedSettingValue === undefined || typeof storedSettingValue !== typeof settingData.default) {
                        extensionLog(self, `Non-matching settings [${categoryKey}][${settingKey}], merging`);

                        storedCategorySettings[settingKey] = settingData.default;
                        categoryModified = true; // Flag for setter
                    }
                }

                // Invoke setter if category settings have been modified
                if(categoryModified === true) {
                    settings.set(categoryKey, storedCategorySettings);
                }
            } else {
                extensionLog(self, `Stored settings category [${categoryKey}] not found, initializing`);
                
                // Category doesn't exist, populate with default settings
                const defaultCategorySettings = Object.entries(categoryData.settings).reduce((obj, [settingKey, settingData]) => {
                    obj[settingKey] = settingData.default;

                    return obj;
                }, {} as SettingsCategory);
                settings.set(categoryKey, defaultCategorySettings);
            }
        }

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            "add-sync-request": addSyncRequest,
            "create-tab-ready": createTabReady,
            "sound-notification": soundNotification,
        }; // Message handlers for processing from Messages API
        messageProcessHandlers(self, messageHandlers);
    });
</script>