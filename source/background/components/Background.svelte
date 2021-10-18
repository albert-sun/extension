<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { decodeQueue, minutesSeconds } from "../../shared/utilities";
    import { bestBuyDisplays, settingLabels } from "../../shared/constants";
    import type { BestBuyQueuesData, BestBuySKUQueuesData, MessageHandlers, ProductQueueData, BestBuyClientQueueData, Setter, Settings } from "../../shared/types";
    import { BroadcastedRequest, BroadcastedResponse, pingRequest, StreamlinedRequest, StreamlinedRequestRaw, StreamlinedResponse } from "../../shared/types_new";
    import { domainMatches, extensionLog, initializeStore, messageProcessHandlers } from "../../shared/utilities";
    import { sleep } from "../../shared/utilities";

    interface AddToCartBody { 
        items: { skuId: string }[]; 
    }; // Body sent with addToCart POST request

    // Declare stores initially to avoid errors
    let queues: Writable<BestBuyQueuesData>;
    let setQueues: Setter;
    let settings: Writable<Settings>; 
    let setSettings: Setter;
    // Streamlined execution of queued execution from background and extension
    const backgroundSelf = "background"; // For logging
    const queuedRequests: StreamlinedRequest[] = [];
    let executing: boolean = false; // Whether execution is currently happening
    let notifications: { [key: string]: string };
    // Best Buy variables
    const bestBuySelf = "background-bestbuy"; // For logging
    const bestBuyCartURL = "https://www.bestbuy.com/cart";
    const bestBuyTabURL = "https://www.bestbuy.com/"; // For auto-opening tabs

    // background: Play corresponding notification sound and show notification
    async function soundNotification(
        soundKey: string, title: string, message: string, settingKeys: [string, string], buttons?: string[]
    ): Promise<string | undefined> {
        // Show desktop notification through API if desired
        let notificationId: string | undefined;
        if($settings[settingKeys[0]][settingKeys[1]] === true) {
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
            }, $settings["global"]["durationNotification"] as number);
        }

        // Always play notification sound with given key if desired
        // Re-initialize from file vs. using existing Audio for simultaneous playing
        if($settings["global"]["playNotifications"] === true) {
            const notificationSound = new Audio(notifications[soundKey]);
            notificationSound.play();
        }

        return notificationId;
    }

    // background: Resolve/reject wrapper for sending messages to tab
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

    // background: Periodically ping tab until response (ready)
    // Note that unresponsive tabs will get pinged forever
    async function pingTabReady(tabId: number, ready: boolean = true) {
        // Keep pinging until tab responds
        while(ready === true) {
            const pingResponse = await sendMessageTab(tabId, pingRequest);
            if(pingResponse !== undefined && typeof pingResponse !== "string") { // Successfully communicated with tab
                break;
            }
            await sleep($settings["global"]["pollingInterval"] as number);
        }
    }

    // background: execute queued requests streamlined on stimulus from message handler
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
            extensionLog(backgroundSelf, `Executing queued request with body ${serializedRequest}`);

            // Check whether tabs matching given URL match exist
            const urlGlob = domainMatches[queuedRequest?.urlMatch];
            const matchingTabs = await browser.tabs.query({ 
                url: domainMatches[queuedRequest?.urlMatch],
                discarded: false, // Can't communicate with unloaded tab
                // status: "loading" // Can't communicate with loading tab
            });
            if(matchingTabs.length === 0) {
                extensionLog(backgroundSelf, `Couldn't find matching tabs with glob ${urlGlob}, placeholder resolving with undefined`);

                // Perform execution depending on setting
                // For now, resolve with undefined but maybe open tab?
                queuedRequest.resolve(queuedResponse);
            }

            // Iterate over tabs and attempt communication
            let retryRequest = false;
            for(const tab of matchingTabs) {
                extensionLog(backgroundSelf, `Attempting to ping tab with ID ${tab.id} and URL ${tab.url}`);

                // Perform ping and check whether tab responds
                const pingResponse = await sendMessageTab(tab.id as number, pingRequest);
                if(pingResponse === undefined || typeof pingResponse === "string") { // Failed to communicate with tab
                    extensionLog(backgroundSelf, `Error pinging content script: ${pingResponse}`);

                    continue;
                }

                extensionLog(backgroundSelf, `Received successful ping response, broadcasting request`);

                // Tab properly responded to ping, send actual request
                const request: BroadcastedRequest = {
                    handler: queuedRequest.handler,
                    args: queuedRequest.args,
                }; // Mirror request from queued parameters
                const response = await sendMessageTab(tab.id as number, request);
                if(response === undefined || typeof response === "string") { // Failed to communicate with tab
                    // Should never happen since ping was successful
                    throw new Error(`error communicating after ping: ${response}`)
                }
                queuedResponse.status = "okay";
                queuedResponse.payload = response;

                // Check whether tab responded with request for execution
                if(response.payload.execute !== undefined) {
                    extensionLog(backgroundSelf, `Response received, performing execution handlers ${response.payload.execute}`);

                    if(response.payload.execute.includes("reload")) {
                        extensionLog(backgroundSelf, `Executing reload for tab with ID ${tab.id}`);

                        // Reload current tab, idle until reloading complete (ping successful)
                        await browser.tabs.reload(tab.id as number);
                        await sleep(1000); // Give a second for the reload to initialize
                        await pingTabReady(tab.id as number);
                    }
                    if(response.payload.execute.includes("retry")) {
                        extensionLog(backgroundSelf, `Executing retry, re-pushing request to back of queue`);

                        // Push queued request to back for retry
                        queuedRequests.push(queuedRequest);

                        retryRequest = true;
                    }
                } else {
                    extensionLog(backgroundSelf, `Response received, no execution handler necessary`);
                }

                break; // Stop sending requests after successful
            }

            // Moved retry handler down since JS/TS doesn't have goto
            if(retryRequest === true) {
                continue;
            }

            const serializedResponse = JSON.stringify(queuedResponse);
            extensionLog(backgroundSelf, `Finished processing queued request, responding with body ${serializedResponse}`);

            // Resolve with either payload or not found
            queuedRequest.resolve(queuedResponse);
        }

        executing = false; // Unlock running instance
    }

    // background: Add a streamlined request to queued and idle until response
    async function addStreamlinedRequest(newRequest: StreamlinedRequestRaw): Promise<StreamlinedResponse> {
        extensionLog(backgroundSelf, `Pushing request to back of queue for streamlined execution`);
        
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

    // background: Creates new tab with specified URL and block until ready
    async function createTabReady(url: string, wait: boolean = true) {
        // Initialize and periodically ping until response
        const tab = await browser.tabs.create({
            active: false,
            url,
        });
        
        // Only wait for load complete if desired
        if(wait === true) {
            await pingTabReady(tab.id as number);
        }
    }

    // background-bestbuy: Merge product queues from page with currently tracked queues
    async function mergeProductQueues(mergeQueueData: BestBuyClientQueueData) {
        // Iterate over browser queue for each SKU, merging unseen with currently tracked
        const currentTime = new Date().getTime(); // In milliseconds from epoch
        for(const [sku, skuQueueData] of Object.entries(mergeQueueData)) {
            // Check whether queue with given ID is being tracked
            const existingQueues = $queues[sku] || {};
            if(existingQueues[skuQueueData[1]] === undefined) {
                // Decode queue and remaining time from data
                const [startTime, a2cTransactionReferenceId, a2cTransactionCode] = skuQueueData;
                const queueTime = decodeQueue(skuQueueData[1]); 
                const remainingTime = startTime + queueTime - currentTime;
                const [remainingMinutes, remainingSeconds, negative] = minutesSeconds(remainingTime);
                
                // Don't bother adding if queue already expired
                if(remainingTime > -5 * 60 * 1000) {
                    // Construct and store queue data for given SKU, then append or replace existing
                    // existingQueues updated within updateReplaceQueues when ran
                    const queueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };
                    const existingQueues = $queues[sku] || {};
                    
                    // Check Best Buy setting to see whether replacement needed
                    if($settings["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                        // Perform update and replacement with import queue
                        const [shorter, diffMinutes, diffSeconds] = updateReplaceQueues(existingQueues, queueData, currentTime);
                        if(shorter === true) {
                            // Imported queue improvement
                            extensionLog(backgroundSelf, `Importing queue for SKU ${sku} has ${diffMinutes}m ${diffSeconds}s improvement, replacing`);
                        } else {
                            // Worse imported queue, don't replace and ignore
                            extensionLog(backgroundSelf, `Importing queue for SKU ${sku} worse by ${diffMinutes}m ${diffSeconds}s improvement, not replacing`);
                        }
                    } else {
                        // Perform regular appending to existing list
                        if(negative === false) {
                            // Queue hasn't popped yet
                            extensionLog(backgroundSelf, `Importing queue for SKU ${sku} with ${remainingMinutes}m ${remainingSeconds}s remaining`);
                        } else {
                            // Queue already popped but hasn't expired yet
                            extensionLog(backgroundSelf, `Importing queue for SKU ${sku} already popped for ${remainingMinutes}m ${remainingSeconds}s`);
                        }
                    }
                    setQueues(sku, existingQueues);
                }
            }
        }
    }

    // background-bestbuy: Update and replace queues for given existing queues, keeping the shortest
    function updateReplaceQueues(
        existingQueues: BestBuySKUQueuesData, newQueueData: ProductQueueData, currentTime: number
    ): [boolean, number, number] {
        // Deconstruct current queues into remaining time
        const existingQueuesMapped = Object.entries(existingQueues)
            .map(([queueKey, queueData]) => {
                const remainingTime = queueData.startTime + queueData.queueTime - currentTime;
                return [remainingTime, queueKey, queueData] as [number, string, ProductQueueData];
            }); // [remaining, queueKey, queueData]

        // Sort before adding new queue, inefficient I know
        existingQueuesMapped.sort((queue1, queue2) => { return queue1[0] - queue2[0] });
        const previousBestRemaining = existingQueuesMapped[0][0];

        // Check whether previous queue time(s) are shorter 
        const newQueueKey = newQueueData.a2cTransactionReferenceId;
        const newRemaining = newQueueData.startTime + newQueueData.queueTime - currentTime;
        existingQueuesMapped.push([newRemaining, newQueueKey, newQueueData]);

        // Sort and check whether ID of first index switches to new
        existingQueuesMapped.sort((queue1, queue2) => { return queue1[0] - queue2[0] });
        const [diffMinutes, diffSeconds, diffNegative] = minutesSeconds(previousBestRemaining - newRemaining, true);
        const shorter = existingQueuesMapped[0][1] === newQueueData.a2cTransactionReferenceId;

        // Trim everything but the shortest queue
        existingQueues = {};
        existingQueues[newQueueData.a2cTransactionReferenceId] = newQueueData;

        return [shorter, diffMinutes, diffSeconds];
    }

    // background-bestbuy: Wrapper for processing add-to-cart by broadcasting to streamline handler
    // Depending on settings and result status, plays sound and shows notifications
    async function processAddToCart(
        sku: string, a2cTransactionReferenceId?: string, a2cTransactionCode?: string
    ) {
        // Construct request for broadcasting to streamlined
        const streamlinedRequest: StreamlinedRequestRaw = {
            urlMatch: "bestbuy",
            handler: "process-add_to_cart",
            args: [sku, a2cTransactionReferenceId, a2cTransactionCode],
        };

        // Keep broadcasting request until response gotten
        let response: BroadcastedResponse;
        do {
            // Broadcast request and idle until response received (processed sequentially)
            let streamlinedResponse = await addStreamlinedRequest(streamlinedRequest);
            if(streamlinedResponse.status === "not-found") { // Failed to communicate with background
                // Check relevant global setting for action
                if($settings["global"]["autoOpenTab"] === true) {
                    extensionLog(bestBuySelf, `Matching tab not found, creating new tab with url ${bestBuyTabURL}`);

                    // Automatically open Best Buy tab and idle until ready before re-sending
                    await createTabReady(bestBuyTabURL);
                    
                    extensionLog(bestBuySelf, `Tab creation finished, re-broadcasting initial request`);
                    
                    continue;
                } else { 
                    extensionLog(bestBuySelf, `Matching tab not found, showing notification and exiting`);

                    // Instead, just show notification and play sound
                    const title = "Best Buy - Tab Not Found";
                    const message = "Matching tab not found or content script not responding. Open a matching tab or try reloading the page.";
                    const notificationId = await soundNotification("error", title, message, ["global", "notificationNotFound"]);
                    // Attach onclick for opening new tab manually
                    if(notificationId !== undefined) { // Means notification displayed
                        // Are there issues with memory leaks when listeners are added?
                        browser.notifications.onButtonClicked.addListener(async function(_, buttonIndex) {
                            // 0 index means open cart page
                            if(buttonIndex === 0) {
                                // Create tab but don't waste resources pinging loading
                                await createTabReady(bestBuyTabURL, false);
                            }
                        });
                    }

                    return;
                }
            }
            response = streamlinedResponse.payload as BroadcastedResponse;

            break;
        } while(true); // Keep looping, usually only requires single iteration

        // Show notification and play sound depending on status and settings            
        // Initialize variables in advance to prevent hard-coding?
        // TODO streamline callbacks and sending under if/else statements
        let title: string; let message: string; 
        let settingKeys: [string, string]; let buttons: string[];
        const productName = bestBuyDisplays[sku];
        if(response.result === "okay") {
            // Handler ran okay, peform default actions
            if(response.payload.value === 200) {
                // Successfully carted (might not show in cart though)
                extensionLog(bestBuySelf, `Successfully added ${productName} to cart`);

                // Broadcast notification and attach onclick handler
                title = "Best Buy - Successful Cart";
                message = productName;
                settingKeys = ["bestbuy", "notificationSuccess"];
                buttons = ["Open cart page"];
                const notificationId = await soundNotification("success", title, message, settingKeys, buttons);
                if(notificationId !== undefined) { // Means notification displayed
                    // Are there issues with memory leaks when listeners are added?
                    browser.notifications.onButtonClicked.addListener(async function(_, buttonIndex) {
                        // 0 index means open cart page
                        if(buttonIndex === 0) {
                            // Create tab but don't waste resources pinging loading
                            await createTabReady(bestBuyCartURL, false);
                        }
                    });
                }
            } else if(response.payload.value === 400) {
                // Failed to cart (either invalid queue or not avialable)
                extensionLog(bestBuySelf, `Failed to cart ${productName}, either invaild queue or unavailable`);

                // Broadcast notification, no onclick needed to re-queue?
                title = "Best Buy - Failed to Cart";
                message = productName;
                settingKeys = ["bestbuy", "notificationFailure"];
                await soundNotification("failure", title, message, settingKeys);
            } else {
                // Server error (500 rate limit, 403 rate limit or uncartable)
                // Can't reload tab from notification button because tab ID not returned, TODO?
                extensionLog(bestBuySelf, `Error carting ${productName} with status ${status}`);

                // Broadcast notification, no onclick needed to re-queue?
                title = `Best Buy - Error ${status}`;
                if($settings["bestbuy"]["autoReload"] === true) {
                    message = `Error carting ${productName} - possible rate limiting, automatically reloading tab and retrying request`;
                } else {
                    message = `Error carting ${productName} - possible rate limiting, not automatically reloading tab`;
                }
                settingKeys = ["bestbuy", "notificationError"];
                await soundNotification("error", title, message, settingKeys);
            }
        } /*else {
            // Handler errored, display as notification
            extensionLog(bestBuySelf, `Error performing handler ${"process-add_to_cart"}: ${response.payload}`);

            title = "Extension Error for 'Best Buy'";
            message = response.payload.value;
            settingKeys = ["global", "notificationError"];
            await soundNotification("error", title, message, settingKeys);
        }*/
    }
    
    // Does not include destructor, don't care
    onMount(async function() {
        // background: Load notification sounds from resource file for playing
        notifications = {
            "success": "../resources/notification_success.mp3",
            "failure": "../resources/notification_queue.mp3",
            "queue": "../resources/notification_queue.mp3",
            "error": "../resources/notification_ratelimit.mp3",
        };

        // background: Initialize settings store from storage and merge with version updates
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

        // background-bestbuy: Initialize queues store and initial queue count
        ({ store: queues, set: setQueues } = await initializeStore<BestBuyQueuesData>( "queues", {}));
        let initialQueues = 0;
        for(const [sku, skuQueueData] of Object.entries($queues)) {
            initialQueues += Object.keys(skuQueueData).length;
        }
        extensionLog(bestBuySelf, `Startup routine, retrieved and tracking ${initialQueues} existing queues from storage`);
        
        // background-bestbuy: Initialize periodic interval for checking queues
        // Automatically broadcast add-to-cart to content script when queue elapsed
        const blacklisted: Set<string> = new Set(); // Failed queues to ignore for automatic adding
        setInterval(async function() {
            // Iterate over SKU data and individual queues within checking for readiness
            const currentTime = new Date().getTime(); // In milliseconds from epoch
            for(const [sku, skuQueueData] of Object.entries($queues)) {
                for(const [a2cTransactionReferenceId, queueData] of Object.entries(skuQueueData)) {
                    // Check whether queue popped, if so broadcast both add-to-cart and deletion
                    const remainingTime = queueData.startTime + queueData.queueTime - currentTime;
                    if(remainingTime <= 0) {
                        // Only add and notify if not expired, otherwise silently delete
                        if(remainingTime > -5 * 60 * 1000) {
                            // Check whether setting to auto-add is enabled before proceeding
                            if($settings["bestbuy"]["autoAddQueue"] === true && blacklisted.has(queueData.a2cTransactionReferenceId) === false) {
                                extensionLog("background-bestbuy", `Queue popped for SKU ${sku}, broadcasting add-to-cart request`);
                            
                                // Add blacklist so queue isn't re-executed, other handler deals with retrying
                                blacklisted.add(queueData.a2cTransactionReferenceId);

                                // Process add-to-cart sequentially with other requests
                                await processAddToCart(sku, queueData.a2cTransactionReferenceId, queueData.a2cTransactionCode);
                            } else {
                                extensionLog("background-bestbuy", `Queue popped for SKU ${sku}, waiting for manual because of setting`);
                            }
                        } else {
                            extensionLog("background-bestbuy", `Queue popped but expired for ${sku}, silently deleting`);
                        
                            // Remove from set of blacklisted if found
                            blacklisted.delete(queueData.a2cTransactionReferenceId);

                            // Perform deletion using custom logic
                            delete skuQueueData[a2cTransactionReferenceId];
                            setQueues(sku, skuQueueData);
                        }
                    }
                }
            }
        }, 1000); // Default check every second 

        // background-bestbuy: Register webRequest listeners for intercepting Best Buy add-to-cart requests
        const requestBodyCache: { [requestId: string]: AddToCartBody } = {};
        chrome.webRequest.onBeforeRequest.addListener(function(details) {
            // Ignore for GET requests which should never happen
            if(details.requestBody !== undefined) {
                // Complicated process to decode request body to string...
                const decodedBody = decodeURIComponent(String.fromCharCode.apply(null, // @ts-ignore
                    new Uint8Array(details.requestBody.raw[0].bytes))); 
                const parsedBody = JSON.parse(decodedBody) as AddToCartBody;
                requestBodyCache[details.requestId] = parsedBody;

                // Prepare list of SKU(s) for output from parsed body
                const skus = parsedBody.items.map(item => item.skuId);
                const serializedSKUs = JSON.stringify(skus);

                extensionLog("background-bestbuy", `[webRequest.onBeforeRequest] Finished caching POST body for request ${details.requestId} with SKU(s) ${serializedSKUs}`, "debug");
            }
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["requestBody", "blocking"]); 
        chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
            // Parse payload from cached request body
            const cachedBody = requestBodyCache[details.requestId]; // In case if somehow not cached
            if(cachedBody === undefined) {
                // Cached body doesn't exist, shouldn't happen
                extensionLog("background-bestbuy", `[webRequest.onBeforeSendHeaders] Couldn't find cached POST body for request ${details.requestId}`, "error");
                
                return;
            } 
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["requestHeaders", "blocking"]);
        chrome.webRequest.onHeadersReceived.addListener(function(details) {
            // Track whether headers found before adding
            let a2cTransactionReferenceId = "";
            let a2cTransactionCode = "";
            for(const header of (details.responseHeaders || [])) {
                if(header.name === "a2ctransactionreferenceid") {
                    a2cTransactionReferenceId = header.value as string;
                } else if(header.name === "a2ctransactioncode") {
                    a2cTransactionCode = header.value as string;
                }
            }

            // If both headers exist and setting enabled, add queue using sku from cached body
            if((details.statusCode !== 200 || $settings["bestbuy"]["requeueSuccess"] === true)
                && a2cTransactionReferenceId !== "" && a2cTransactionCode !== "") {
                // Retrieve SKU from cached request body, assume SKU is desired
                const cachedBody = requestBodyCache[details.requestId]; // In case if somehow not cached
                if(cachedBody === undefined) {
                    // Cached body doesn't exist, shouldn't happen
                    extensionLog("background-bestbuy", `[webRequest.onHeadersReceived] Couldn't find cached POST body for request ${details.requestId}`, "error");
                    
                    return;
                }
                const sku = cachedBody.items[0]?.skuId; // Assume always defined

                // Decode remaining queue time from a2ctransactioncode
                const startTime = new Date().getTime(); // In milliseconds from epoch
                const queueTime = decodeQueue(a2cTransactionCode); 
                const [minutes, seconds] = minutesSeconds(queueTime); // Only for debugging purposes
                const queueData: ProductQueueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };

                extensionLog("background-bestbuy", `[webRequest.onHeadersReceived] Queue response headers detected for request ${details.requestId} with time ${minutes}m ${seconds}s`);

                // Construct and broadcast queue data through Writable
                let message: string = ""; // To be filled within statements
                const productName = bestBuyDisplays[sku];
                let existingQueues = $queues[sku] || {};

                // Either append to existing or replace queue depending on setting
                if($settings["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                    // Perform replacement and check whether new queue improved
                    // existingQueues updated within updateReplaceQueues when ran
                    const [shorter, diffMinutes, diffSeconds] = updateReplaceQueues(existingQueues, queueData, startTime);
                    if(shorter === true) {
                        // Current queue has improvement, show notification
                        message = `[${productName}] Queue replacement enabled, replacing with ${diffMinutes}m ${diffSeconds}s improvement`;
                    } else {
                        // No improvement, clear stragglers and show notification
                        message = `[${productName}] Queue replacement enabled, not replacing because ${diffMinutes}m ${diffSeconds}s worse`;
                    }
                } else {
                    message = `[${productName}] Intercepted new queue with timer ${minutes}m ${seconds}s`;

                    // Otherwise, perform regular "appending" to queues
                    existingQueues[a2cTransactionReferenceId] = queueData;
                }
                setQueues(sku, existingQueues);

                // Construct for sending notification with sound
                // Can't await soundNotification because async not allowed?
                const title = "Best Buy - Queue Intercepted";
                soundNotification("queue", title, message, ["bestbuy", "notificationQueue"]);
            }

            // Delete cached body with request ID to prevent memory leaks
            delete requestBodyCache[details.requestId];
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["responseHeaders", "blocking"]);

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            // background
            "add-request": addStreamlinedRequest,
            "create-tab-ready": createTabReady,
            "sound-notification": soundNotification,
            // background-bestbuy
            "get-bestbuy-product_queues": async function() { return $queues },
            "merge-product_queues": mergeProductQueues,
            "process-add_to_cart": processAddToCart,
        }; // Message handlers for processing from Messages API
        messageProcessHandlers(backgroundSelf, messageHandlers, [backgroundSelf, "extension"]);
    });
</script>