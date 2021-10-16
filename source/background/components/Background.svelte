<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { settingLabels } from "../../shared/constants";
    import type { MessageHandlers, Setter, Settings } from "../../shared/types";
    import { BroadcastedRequest, BroadcastedResponse, pingRequest, StreamlinedRequest, StreamlinedRequestRaw, StreamlinedResponse } from "../../shared/types_new";
    import { domainMatches, extensionLog, initializeStore, messageProcessHandlers } from "../../shared/utilities";
    import { sleep } from "../../shared/utilities";

    // Declare stores initially to avoid errors
    let settings: Writable<Settings>; 
    let setSettings: Setter;
    // Streamlined execution of queued execution from background and extension
    const queuedRequests: StreamlinedRequest[] = [];
    let executing: boolean = false; // Whether execution is currently happening

    // Resolve/reject wrapper for sending messages to tab
    // Currently doesn't implement timeout but maybe later?
    async function sendMessageTab(
        tabId: number, request: BroadcastedRequest
    ): Promise<BroadcastedResponse | string> {
        return await new Promise((resolve) => {
            browser.tabs.sendMessage(tabId, request)
                .then(response => resolve(response as BroadcastedResponse)) // Successful
                .catch(error => resolve((error as Error).message)); // Failed, no link
        });
    }

    // Periodically ping tab until response (ready)
    // Note that unresponsive tabs will get pinged forever
    async function pingTabReady(tabId: number, ready: boolean = true) {
        // Keep pinging until tab responds
        while(ready === true) {
            const pingResponse = await sendMessageTab(tabId, pingRequest);
            if(typeof pingResponse !== "string") { // Successfully communicated with tab
                break;
            }
            await sleep($settings["global"]["pollingInterval"] as number);
        }
    }

    // Execute queued requests streamlined on stimulus from message handler
    async function performStreamlinedRequests() {
        // Only want one instance running at a time, use pseudo-lock
        if(executing === true) {
            return; 
        }
        executing = true; // Lock running instance

        // Perform queued requests streamlined while they exist, and resolve each
        while(queuedRequests.length > 0) {
            // Initialize queued request and default response for given request
            const queuedRequest = queuedRequests.shift() as StreamlinedRequest;
            const queuedResponse: StreamlinedResponse = {
                status: "not-found",
                payload: undefined,
            };

            const serializedRequest = JSON.stringify(queuedRequest);
            extensionLog("background", `Executing queued request with body ${serializedRequest}`);

            // Check whether tabs matching given URL match exist
            const urlGlob = domainMatches[queuedRequest?.urlMatch];
            const matchingTabs = await browser.tabs.query({ 
                url: domainMatches[queuedRequest?.urlMatch],
                discarded: false, // Can't communicate with unloaded tab
                // status: "loading" // Can't communicate with loading tab
            });
            if(matchingTabs.length === 0) {
                extensionLog("background", `Couldn't find matching tabs with glob ${urlGlob}, placeholder resolving with undefined`);

                // Perform execution depending on setting
                // For now, resolve with undefined but maybe open tab?
                queuedRequest.resolve(queuedResponse);
            }

            // Iterate over tabs and attempt communication
            for(const tab of matchingTabs) {
                extensionLog("background", `Attempting to ping tab with ID ${tab.id} and URL ${tab.url}`);

                // Perform ping and check whether tab responds
                const pingResponse = await sendMessageTab(tab.id as number, pingRequest);
                if(typeof pingResponse === "string") { // Failed to communicate with tab
                    extensionLog("background", `Error pinging content script: ${pingResponse}`);

                    continue;
                }

                extensionLog("background", `Received successful ping response, broadcasting request`);

                // Tab properly responded to ping, send actual request
                const request: BroadcastedRequest = {
                    handler: queuedRequest.handler,
                    args: queuedRequest.args,
                }; // Mirror request from queued parameters
                const response = await sendMessageTab(tab.id as number, request);
                if(typeof response === "string") { // Failed to communicate with tab
                    // Should never happen since ping was successful
                    throw new Error(`error communicating after ping: ${response}`)
                }
                queuedResponse.status = "okay";
                queuedResponse.payload = response;

                // Check whether tab responded with request for execution
                if(response.payload.execute !== undefined) {
                    extensionLog("background", `Response received, performing execution handler ${response.payload.execute}`);

                    if(response.payload.execute === "reload") {
                        // Reload current tab, idle until reloading complete (ping successful)
                        await browser.tabs.reload(tab.id as number);
                        await pingTabReady(tab.id as number);
                    }
                } else {
                    extensionLog("background", `Response received, no execution handler necessary`);
                }

                break; // Only send request a single time
            }

            const serializedResponse = JSON.stringify(queuedResponse);
            extensionLog("background", `Finished processing queued request, responding with body ${serializedResponse}`);

            // Resolve with either payload or not found
            queuedRequest.resolve(queuedResponse);
        }

        executing = false; // Unlock running instance
    }

    // Add a streamlined request to queued and idle until response
    async function addStreamlinedRequest(newRequest: StreamlinedRequestRaw): Promise<StreamlinedResponse> {
        extensionLog("background", `Pushing request to back of queue for streamlined execution`);
        
        // Push new request to existing queue and wait for completion
        return new Promise((resolve) => {
            // Construct and add queued request
            const queuedRequest: StreamlinedRequest = {
                ...newRequest,
                resolve, 
            }; // Will block until resolution
            queuedRequests.push(queuedRequest);
            performStreamlinedRequests(); // Runs asynchronously, wait for resolve
        });
    }

    // Creates new tab with specified URL and block until ready
    async function createTabReady(url: string) {
        // Initialize and periodically ping until response
        const tab = await browser.tabs.create({
            active: false,
            url,
        });
        await pingTabReady(tab.id as number);
    }
    
    // Does not include destructor, don't care
    onMount(async function() {
        // Initialize settings store from storage and merge with version updates
        ({ store: settings, set: setSettings } = await initializeStore<Settings>( "settings", {}));
        for(const [categoryKey, categoryData] of Object.entries(settingLabels)) {
            // Check whether the given settings category exists
            const currentCategoryData = $settings[categoryKey];
            if($settings[categoryKey] !== undefined) {
                // Category exists, merge settings that aren't defined
                let somethingChanged = false;
                for(const [settingKey, settingValue] of Object.entries(categoryData.settings)) {
                    // Modify current category data if undefined or wrong type, then merge
                    // Currently doesn't remove obsolete settings but TODO
                    const currentSettingValue = currentCategoryData[settingKey];
                    if(currentSettingValue === undefined || typeof currentSettingValue !== typeof settingValue) {
                        currentCategoryData[settingKey] = settingValue.default;
                        somethingChanged = true;
                    }
                }

                // Invoke setter if something has changed
                if(somethingChanged === true) {
                    setSettings(categoryKey, currentCategoryData);
                }
            } else {
                // Doesn't exist, set with default settings
                setSettings(categoryKey, categoryData);
            }
        }

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            "add-request": addStreamlinedRequest,
            "create-tab-ready": createTabReady,
        }; // Message handlers for processing from Messages API
        messageProcessHandlers("background", messageHandlers, ["background", "extension"]);
    });
</script>