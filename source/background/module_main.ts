import { get } from "svelte/store";
import { settingsDisplays } from "../shared/constants";
import { domainMatches, pingRequest } from "../shared/constants";
import { settings } from "../shared/initializations";
import type { SettingsCategory } from "../shared/types";
import type { BroadcastedRequest, BroadcastedResponse, SyncRequest } from "../shared/types";
import { extensionLog, pingTabReady, sendRequestContent, sleep } from "../shared/utilities";

const loggingSelf = "background_main";
let notifications: { [key: string]: string } = {
    "success": "../resources/notification_success.mp3",
    "failure": "../resources/notification_queue.mp3",
    "error": "../resources/notification_ratelimit.mp3",
    // Best Buy
    "queue": "../resources/notification_queue.mp3",
}; // Notification sound file paths
let queuedRequests: SyncRequest[] = [];
let executing: boolean = false; // Whether execution is currently happening

// Merge currently stored settings with possibly new or changed extension values 
export async function mergeSettings() {
    extensionLog(loggingSelf, "Merging stored settings with extension display values");

        // Source of truth: merge settings with defaults and possibly newly added
        // Doesn't currently delete obsolete settings but whatever honestly
        for(const [categoryKey, categoryData] of Object.entries(settingsDisplays)) {
            // Check whether the given settings category exists
            const storedCategorySettings = get(settings.store)[categoryKey];
            if(storedCategorySettings !== undefined) {
                // Category exists, iterate over and merge settings
                let categoryModified = false;
                for(const [settingKey, settingData] of Object.entries(categoryData.settings)) {
                    // Replace with default if setting doesn't exist or is wrong type
                    const storedSettingValue = storedCategorySettings[settingKey];
                    if(storedSettingValue === undefined || typeof storedSettingValue !== typeof settingData.default) {
                        extensionLog(loggingSelf, `Non-matching settings [${categoryKey}][${settingKey}], merging`);

                        storedCategorySettings[settingKey] = settingData.default;
                        categoryModified = true; // Flag for setter
                    }
                }

                // Invoke setter if category settings have been modified
                if(categoryModified === true) {
                    settings.set(categoryKey, storedCategorySettings);
                }
            } else {
                extensionLog(loggingSelf, `Stored settings category [${categoryKey}] not found, initializing`);
                
                // Category doesn't exist, populate with default settings
                const defaultCategorySettings = Object.entries(categoryData.settings).reduce((obj, [settingKey, settingData]) => {
                    obj[settingKey] = settingData.default;

                    return obj;
                }, {} as SettingsCategory);
                settings.set(categoryKey, defaultCategorySettings);
            }
        }
}

// Execute queued requests sync on stimulus from message handler
async function performSyncRequests() {
    // Only want one instance running at a time, use pseudo-lock
    if(executing === true) {
        return; 
    }
    executing = true; // Lock running instance

    // In case of critical error, still be able to cancel execution
    try {
        // Perform queued requests sync while they exist, and resolve each
        while(queuedRequests.length > 0) {
            // Initialize queued request and default response for given request
            const queuedRequest = queuedRequests.shift() as SyncRequest;
            const queuedResponse: BroadcastedResponse = {
                result: "not-found",
                payload: {
                    value: undefined,
                    execute: [],
                },
            };

            const serializedRequest = JSON.stringify(queuedRequest);
            extensionLog(loggingSelf, `Executing queued sequential request with body ${serializedRequest}`);

            // Check whether tabs matching given URL match exist
            const urlGlob = domainMatches[queuedRequest?.urlMatch];
            const matchingTabs = await browser.tabs.query({ 
                url: domainMatches[queuedRequest?.urlMatch],
                discarded: false, // Can't communicate with unloaded tab
                // status: "loading" // Can't communicate with loading tab
            });
            if(matchingTabs.length === 0) {
                extensionLog(loggingSelf, `Couldn't find matching browser tabs with URL glob ${urlGlob}, resolving with not-found response`);

                // Perform execution depending on setting
                // For now, resolve with undefined but maybe open tab?
                queuedRequest.resolve(queuedResponse);
            }

            // Iterate over tabs and attempt communication
            let retryRequest = false;
            for(const tab of matchingTabs) {
                extensionLog(loggingSelf, `Attempting to ping tab with ID ${tab.id} and URL ${tab.url}`);

                // Perform ping and check whether tab responds
                const pingResponse = await sendRequestContent(tab.id as number, pingRequest);
                if(pingResponse.result === "error") { // Failed to communicate with tab
                    extensionLog(loggingSelf, `Error pinging content script: ${pingResponse.payload.value}`);

                    continue;
                }

                extensionLog(loggingSelf, `Received successful ping response, broadcasting request`);

                // Tab properly responded to ping, send actual request
                const request: BroadcastedRequest = {
                    handler: queuedRequest.handler,
                    args: queuedRequest.args,
                }; // Mirror request from queued parameters
                const response = await sendRequestContent(tab.id as number, request);
                if(response.result === "error") { // Failed to communicate with tab
                    // Should never happen since ping was successful
                    throw new Error(`error performing handler: ${response}`)
                }
                queuedResponse.result = "ok";
                queuedResponse.payload = response.payload;

                // Check whether tab responded with request for execution
                if(response.payload.execute !== undefined) {
                    extensionLog(loggingSelf, `Response received, performing execution handlers ${response.payload.execute}`);

                    if(response.payload.execute.includes("reload")) {
                        extensionLog(loggingSelf, `Executing reload for tab with ID ${tab.id}`);

                        // Reload current tab, idle until reloading complete (ping successful)
                        await browser.tabs.reload(tab.id as number);
                        await sleep(2500); // Give a few seconds for the reload to initialize
                        await pingTabReady(tab.id as number, 100);
                    }
                    if(response.payload.execute.includes("retry")) {
                        extensionLog(loggingSelf, `Executing retry, re-pushing request to back of queue`);

                        // Push queued request to back for retry
                        queuedRequests.push(queuedRequest);

                        retryRequest = true;
                    }
                } else {
                    extensionLog(loggingSelf, `Response received, no execution handler necessary`);
                }

                break; // Stop sending requests after successful
            }

            // Moved retry handler down since JS/TS doesn't have goto
            if(retryRequest === true) {
                continue;
            }

            const serializedResponse = JSON.stringify(queuedResponse);
            extensionLog(loggingSelf, `Finished processing queued request, responding with body ${serializedResponse}`);

            // Resolve with either payload or not found
            queuedRequest.resolve(queuedResponse);
        }
    } catch(err) {
        // Does the below still run? idk
        executing = false; 

        throw err;
    }

    executing = false; // Unlock running instance
}

// Add a sync request to queued and idle until response
export async function addSyncRequest(request: BroadcastedRequest, urlMatch: string): Promise<BroadcastedResponse> {
    extensionLog(loggingSelf, `Pushing request to back of queue for sync execution`);
    
    // Push new request to existing queue and wait for completion
    return new Promise((resolve) => {
        // Construct and add queued request
        const queuedRequest: SyncRequest = {
            ...request,
            urlMatch, resolve, 
        }; // Will block until resolution
        queuedRequests.push(queuedRequest);
        performSyncRequests(); // Runs asynchronously, wait for resolve
    });
}

// Creates new tab with specified URL and block until ready
export async function createTabReady(url: string, wait: boolean = true) {
    // Initialize and periodically ping until response
    const tab = await browser.tabs.create({
        active: false,
        url,
    });
    
    // Only wait for load complete if desired
    if(wait === true) {
        await pingTabReady(tab.id as number, 100);
    }
}

// Play corresponding notification sound and show notification
export async function soundNotification(
    soundKey: string, title: string, message: string, settingKeys: [string, string], buttons?: string[]
): Promise<string | undefined> {
    // Show desktop notification through API if desired
    let notificationId: string | undefined;
    if(get(settings.store)[settingKeys[0]][settingKeys[1]] === true) {
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
        }, get(settings.store)["global"]["durationNotification"] as number);
    }

    // Always play notification sound with given key if desired
    // Re-initialize from file vs. using existing Audio for simultaneous playing
    if(get(settings.store)["global"]["playNotifications"] === true) {
        const notificationSound = new Audio(notifications[soundKey]);
        notificationSound.play();
    }

    return notificationId;
}