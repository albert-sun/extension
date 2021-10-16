<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { decodeQueue, minutesSeconds } from "../../extension/utilities";
    import { bestBuyDisplays } from "../../shared/constants";
    import type { BestBuyQueuesData, Settings, MessageHandlers, Setter, QueueData, ProductQueueData, BestBuySKUQueuesData } from "../../shared/types";
    import type { StreamlinedRequestRaw } from "../../shared/types_new";
    import { extensionLog, initializeStore, messageProcessHandlers, sendRequestBackground } from "../../shared/utilities";

    interface AddToCartBody { 
        items: { skuId: string }[]; 
    }; // Body sent with addToCart POST request

    const cartURL = "https://www.bestbuy.com/cart";
    const tabURL = "https://www.bestbuy.com/"; // For auto-opening tabs
    let notifications: { [key: string]: HTMLAudioElement };

    // Declare stores initially to avoid errors
    let queues: Writable<BestBuyQueuesData>;
    let setQueues: Setter;
    let settings: Writable<Settings>; // Read-only

    // Play corresponding notification sound and show notification
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
        }

        // Always play notification sound with given key 
        notifications[soundKey].play();

        return notificationId;
    }

    // Merge product queues from page with currently tracked queues
    async function mergeProductQueues(mergeQueueData: QueueData) {
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
    }

    // Update and replace queues for given existing queues, keeping the shortest
    function updateReplaceQueues(
        existingQueues: BestBuySKUQueuesData, newQueueData: ProductQueueData, startTime: number
    ): [boolean, number, number] {
        // Deconstruct current queues into remaining time
        const existingQueuesMapped = Object.entries(existingQueues)
            .map(([queueKey, queueData]) => {
                const remainingTime = queueData.startTime + queueData.queueTime - startTime;
                return [remainingTime, queueKey, queueData] as [number, string, ProductQueueData];
            }); // [remaining, queueKey, queueData]

        // Sort before adding new queue, inefficient I know
        existingQueuesMapped.sort((queue1, queue2) => { return queue1[0] - queue2[0] });
        const previousBestRemaining = existingQueuesMapped[0][0];

        // Check whether previous queue time(s) are shorter 
        const newQueueKey = newQueueData.a2cTransactionReferenceId;
        const newRemaining = newQueueData.startTime + newQueueData.queueTime - startTime;
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

    // Wrapper for processing add-to-cart by broadcasting to streamline handler
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

        // Broadcast request and idle until response received (processed sequentially)
        let streamlinedResponse = await sendRequestBackground(
            "add-request", [streamlinedRequest],
        );
        if(typeof streamlinedResponse === "string") { // Failed to communicate with background
            extensionLog("background-bestbuy", `error performing add-to-cart request: ${streamlinedResponse}`);

            return true;
        }

        // Check whether no tabs available for communication
        while(streamlinedResponse.result === "not-found") { 
            // Check relevant global setting for action
            if($settings["global"]["autoOpenTab"] === true) {
                extensionLog("background-bestbuy", `Matching tab not found, creating new tab with url ${tabURL}`);

                // Automatically open Best Buy tab and idle until ready before re-sending
                await sendRequestBackground("create-tab-ready", [tabURL]);
                
                extensionLog("background-bestbuy", `Tab creation finished, re-broadcasting initial request`);
                
                // Re-broadcast queued request through hopefully open tab
                streamlinedResponse = await sendRequestBackground(
                    "add-request", [streamlinedRequest],
                );
                if(typeof streamlinedResponse === "string") { // Failed to communicate with background
                    extensionLog("background-bestbuy", `error performing add-to-cart request: ${streamlinedResponse}`);

                    return true;
                }
            } else { 
                extensionLog("background-bestbuy", `Matching tab not found, showing notification and exiting`);

                // Instead, just show notification and play sound
                const title = "Best Buy - Tab Not Found";
                const message = "Matching tab not found or content script not responding. Open a matching tab or try reloading the page.";
                const notificationId = await soundNotification("error", title, message, ["global", "notificationNotFound"]);
                if(notificationId !== undefined) {
                    // Attach onclick for opening new tab manually
                    if(notificationId !== undefined) { // Means notification displayed
                        // Are there issues with memory leaks when listeners are added?
                        browser.notifications.onButtonClicked.addListener(async function(_, buttonIndex) {
                            // 0 index means open cart page
                            if(buttonIndex === 0) {
                                // Create tab but don't waste resources pinging loading
                                await sendRequestBackground("create-tab-ready", [tabURL, false]);
                            }
                        });
                    }
                }

                break;
            }
        }

        // Placeholder for checking other responses eventually
        if(streamlinedResponse.result === "okay") {
            // Show notification and play sound depending on status and settings            
            // Initialize variables in advance to prevent hard-coding?
            // TODO streamline callbacks and sending under if/else statements
            let title: string; let message: string; 
            let settingKeys: [string, string]; let buttons: string[];
            const productName = bestBuyDisplays[sku];
            if(streamlinedResponse.result === "okay") {
                // Handler ran okay, peform default actions
                if(streamlinedResponse.payload.value === 200) {
                    // Successfully carted (might not show in cart though)
                    extensionLog("background-bestbuy", `Successfully added ${productName} to cart`);

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
                                await sendRequestBackground("create-tab-ready", [cartURL, false]);
                            }
                        });
                    }
                } else if(streamlinedResponse.payload.value === 400) {
                    // Failed to cart (either invalid queue or not avialable)
                    extensionLog("background-bestbuy", `Failed to cart ${productName}, either invaild queue or unavailable`);

                    // Broadcast notification, no onclick needed to re-queue?
                    title = "Best Buy - Failed to Cart";
                    message = productName;
                    settingKeys = ["bestbuy", "notificationFailure"];
                    await soundNotification("failure", title, message, settingKeys);
                } else {
                    // Server error (500 rate limit, 403 rate limit or uncartable)
                    // Can't reload tab from notification button because tab ID not returned, TODO?
                    extensionLog("background-bestbuy", `Error carting ${productName} with status ${status}`);

                    // Broadcast notification, no onclick needed to re-queue?
                    title = `Best Buy - Error ${status}`;
                    if($settings["bestbuy"]["autoReload"] === true) {
                        message = `Error carting ${productName} - possible rate limiting, auto-reloading tab`;
                    } else {
                        message = `Error carting ${productName} - possible rate limiting, not auto-reloading tab`;
                    }
                    settingKeys = ["bestbuy", "notificationError"];
                    await soundNotification("error", title, message, settingKeys);
                }
            } else {
                // Handler errored, display as notification
                extensionLog("background-bestbuy", `Error performing handler ${"process-add_to_cart"}: ${streamlinedResponse.payload}`);

                title = "Extension Error for 'Best Buy'";
                message = streamlinedResponse.payload.value;
                settingKeys = ["global", "notificationError"];
                await soundNotification("error", title, message, settingKeys);
            }
        } else if(streamlinedResponse.result === "error") {
        }

        return false;
    }

    // Does not include destructor, don't care
    onMount(async function() {
        // Load notification sounds from resource file for playing
        notifications = {
            "success": new Audio("../resources/notification_success.mp3"),
            "failure": new Audio("../resources/notification_queue.mp3"),
            "queue": new Audio("../resources/notification_queue.mp3"),
            "error": new Audio("../resources/notification_ratelimit.mp3"),
        };

        // Initialize various stores and custom logic for broadcasting updates
        ({ store: queues, set: setQueues } = await initializeStore<BestBuyQueuesData>( "queues", {}));
        ({ store: settings } = await initializeStore<Settings>( "settings", {}));

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
            "process-add_to_cart": processAddToCart,
            "merge-product_queues": mergeProductQueues,
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
                            
                                // Process add-to-cart sequentially with other requests
                                const errored = await processAddToCart(sku, queueData.a2cTransactionReferenceId, queueData.a2cTransactionCode);
                                if(errored === true) { // Errored, add to blacklist
                                    blacklisted.add(queueData.a2cTransactionReferenceId);
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
        }, 1000); // Default check every second 

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
                const title = "Best Buy - Queue Intercepted"
                soundNotification("queue", title, message, ["bestbuy", "notificationQueue"])
            }

            // Delete cached body with request ID to prevent memory leaks
            delete requestBodyCache[details.requestId];
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["responseHeaders", "blocking"]);
    });
</script>