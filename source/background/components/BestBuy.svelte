<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { decodeQueue, minutesSeconds } from "../../extension/utilities";
    import { backgroundSelf, bestBuyDisplays, defaultSettings } from "../../shared/constants";
    import type { BestBuyQueuesData, Settings, MessageHandlers, Setter, QueueData, ProductQueueData } from "../../shared/types";
    import { extensionLog, initializeStore, messageProcessHandlers, sendMessageToContent } from "../../shared/utilities";

    interface AddToCartBody { 
        items: { skuId: string }[]; 
    }; // Body sent with addToCart POST request

    const self = backgroundSelf;
    let notifications: { [key: string]: HTMLAudioElement };

    // Declare stores initially to avoid errors
    let queues: Writable<BestBuyQueuesData>;
    let setQueues: Setter;
    let settings: Writable<Settings>; // Read-only

    // Play corresponding notification sound and show notification
    async function soundNotification(...args: any[]) {
        // Notification: whether to show notification or only play sound
        const [soundKey, title, message, settingsKeys] = args as [string, string, string, string[]];

        // Show desktop notification through API if desired
        if($settings[settingsKeys[0]][settingsKeys[1]] === true) {
            browser.notifications.create({
                type: "basic",
                title: title,
                message: message,
                iconUrl: "../resources/icon_512_dark.png",
            });
        }

        // Play notification sound with given key if desired
        await notifications[soundKey].play()
    }

    // Does not include destructor, don't care
    onMount(async function() {
        // Load notification sounds from resource file for playing
        notifications = {
            "success": new Audio("../resources/notification_success.mp3"),
            "failure": new Audio("../resources/notification_queue.mp3"),
            "queue": new Audio("../resources/notification_queue.mp3"),
            "rateLimit": new Audio("../resources/notification_ratelimit.mp3"),
        };

        // Initialize various stores and custom logic for broadcasting updates
        ({ store: queues, set: setQueues } = await initializeStore<BestBuyQueuesData>(self, "queues", {}));
        ({ store: settings } = await initializeStore<Settings>(self, "settings", defaultSettings));

        // Count and output number of total queues throughout SKUs for debug purposes
        let initialQueues = 0;
        for(const [sku, skuQueueData] of Object.entries($queues)) {
            initialQueues += Object.keys(skuQueueData).length;
        }
        extensionLog("background-bestbuy", `Startup routine, retrieved and tracking ${initialQueues} existing queues from storage`);

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            "sound-notification": soundNotification,
            "get-bestbuy-product_queues": async function() { return $queues },
            "merge-bestbuy-product_queues": async function(mergeQueueData: QueueData) {
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
                        
                        // Don't bother adding if queue already expired
                        if(remainingTime > -5 * 60 * 1000) {
                            // Construct and store queue data for given SKU
                            const queueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };
                            const existingQueues = $queues[sku] || {};
                            existingQueues[a2cTransactionReferenceId] = queueData;
                            setQueues(sku, existingQueues);
                        }
                    }
                }
            },
        }; // Message handlers for processing from Messages API
        messageProcessHandlers("background", messageHandlers, ["content", "extension"]);

        // Initialize periodic interval for checking queues
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
                            
                                // Broadcast add-to-cart request if setting enabled
                                const response = await sendMessageToContent(self, "bestbuy", "process-atc", [sku, queueData]);
                                if(response.payload === 200) {
                                    extensionLog("background-bestbuy", `Successfully added SKU ${sku} to cart`);

                                    // Perform deletion using custom logic
                                    delete skuQueueData[a2cTransactionReferenceId];
                                    setQueues(sku, skuQueueData);
                                } else if (response.status === "error") { // Log handler not found to backend instead
                                    blacklisted.add(queueData.a2cTransactionReferenceId);

                                    extensionLog("background-bestbuy", `Error adding SKU ${sku} to cart: ${response.payload as string}`);
                                } else { // Unknown status like 400, 403, 500
                                    blacklisted.add(queueData.a2cTransactionReferenceId);

                                    extensionLog("background-bestbuy", `Failed to add SKU ${sku} to cart: status ${response.payload}`);

                                    // Don't delete, let user manually retry and automatically dump old
                                    /* delete skuQueueData[a2cTransactionReferenceId];
                                    setQueues(sku, skuQueueData); */
                                } 
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
        }, 5000); // Default check every second 

        // Register webRequest listener for intercepting Best Buy add-to-cart requests
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
                const queueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };

                extensionLog("background-bestbuy", `[webRequest.onHeadersReceived] Queue response headers detected for request ${details.requestId} with time ${minutes}m ${seconds}s`);

                // Construct and broadcast queue data through Writable
                let message: string = ""; // To be filled within statements
                const productName = bestBuyDisplays[sku];
                let existingQueues = $queues[sku] || {};
                if($settings["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                    const currentQueues = Object.entries(existingQueues)
                        .map(([queueKey, queueData]) => {
                            const remainingTime = queueData.startTime + queueData.queueTime - startTime;
                            return [remainingTime, queueKey, queueData] as [number, string, ProductQueueData];
                        }); // [remaining, queueKey, queueData]

                    // Check whether previous queue time is shorter 
                    const currentQueueKey = Object.keys(existingQueues)[0];
                    const currentQueueData = existingQueues[currentQueueKey];
                    const currentRemaining = currentQueueData.startTime + currentQueueData.queueTime - startTime;
                    currentQueues.push([currentRemaining, currentQueueKey, currentQueueData]);

                    // Sort and check whether ID of first index matches
                    currentQueues.sort((queue1, queue2) => { return queue1[0] - queue2[0] });
                    const [diffMinutes, diffSeconds, diffNegative] = minutesSeconds(currentQueues[0][0] - queueTime, true);
                    if(currentQueues[0][1] === queueData.a2cTransactionReferenceId) {
                        // Current queue has improvement, show notification
                        message = `[${productName}] Queue replacement enabled, replacing with ${diffMinutes}m ${diffSeconds}s improvement`;
                    } else {
                        // No improvement, clear stragglers and show notification
                        message = `[${productName}] Queue replacement enabled, not replacing because ${diffMinutes}m ${diffSeconds}s worse`;
                    }

                    // Replace entire set of queues for SKU with best 
                    existingQueues = {};
                    const bestQueueData = currentQueues[0][2];
                    existingQueues[bestQueueData.a2cTransactionReferenceId] = bestQueueData;
                    setQueues(sku, existingQueues);
                } else {
                    message = `[${productName}] Intercepted new queue with timer ${minutes}m ${seconds}s`;

                    // Otherwise, perform regular appending
                    existingQueues[a2cTransactionReferenceId] = queueData;
                    setQueues(sku, existingQueues);
                }

                // Construct for sending notification with sound
                // Can't await soundNotification because async not allowed?
                const title = "Best Buy - Queue Intercepted"
                soundNotification("queue", title, message, ["bestbuy-notifications", "notificationQueue"])
            }

            // Delete cached body with request ID to prevent memory leaks
            delete requestBodyCache[details.requestId];
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["responseHeaders", "blocking"]);
    });
</script>