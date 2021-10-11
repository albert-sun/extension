<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { decodeQueue, minutesSeconds } from "../../extension/utilities";
    import { backgroundSelf, defaultSettings } from "../../shared/constants";
    import type { BestBuyQueuesData, Settings, MessageHandlers, Setter } from "../../shared/types";
    import { extensionLog, initializeStore, messageProcessHandlers } from "../../shared/utilities";

    interface AddToCartBody { 
        items: { skuId: string }[]; 
    }; // Body sent with addToCart POST request

    const self = backgroundSelf;

    // Declare stores initially to avoid errors
    let queues: Writable<BestBuyQueuesData>;
    let setQueues: Setter;
    let settings: Writable<Settings>; // Read-only

    // Does not include destructor, don't care
    onMount(async function() {
        // Initialize various stores and custom logic for broadcasting updates
        ({ store: queues, set: setQueues } = await initializeStore<BestBuyQueuesData>(self, "queues", {}));
        ({ store: settings } = await initializeStore<Settings>(self, "settings", defaultSettings));
        
        // Count and output number of total queues throughout SKUs for debug purposes
        let initialQueues = 0;
        for(const {1: skuQueueData} of Object.entries($queues)) {
            initialQueues += Object.keys(skuQueueData).length;
        }
        extensionLog("background-bestbuy", `Startup routine, retrieved and tracking ${initialQueues} existing queues from storage`);

        // Initialize periodic interval for checking queues
        // Automatically broadcast add-to-cart to content script when queue elapsed
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
                            extensionLog("background-bestbuy", `Queue popped for SKU ${sku}, broadcasting add-to-cart request`);

                            // Broadcast add-to-cart request
                            /*
                            const response = await sendMessageBackContent("bestbuy", "process-atc", [sku, queueData]);
                            if(response.status === "success") {
                                extensionLog("background-bestbuy", `Successfully added SKU ${sku} to cart`);
                            } else if(response.status === "error") {
                                extensionLog("background-bestbuy", `Error adding SKU ${sku} to cart: ${response.payload as string}`);
                            } // Log handler not found to backend instead
                            */
                        } else {
                            extensionLog("background-bestbuy", `Queue popped but expired for ${sku}, silently deleting`);
                        }

                        // Perform deletion using custom logic
                        delete skuQueueData[a2cTransactionReferenceId];
                        setQueues(sku, skuQueueData);
                    }
                }
            }
        }, 5000); // Default check every second 

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            "get-bestbuy-product_queues": async function() { return $queues },
        }; // Message handlers for processing from Messages API
        messageProcessHandlers("background", messageHandlers, ["extension"]);

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

            // If both headers exist, retrieve cached body and add queue
            if(a2cTransactionReferenceId !== "" && a2cTransactionCode !== "") {
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

                // Construct and broadcast queue data through Writable
                const existingQueues = $queues[sku] || {};
                existingQueues[a2cTransactionReferenceId] = queueData;
                setQueues(sku, existingQueues);
            
                extensionLog("background-bestbuy", `[webRequest.onHeadersReceived] Queue response headers detected for request ${details.requestId} with time ${minutes}m ${seconds}s`);
            }

            // Delete cached body with request ID to prevent memory leaks
            delete requestBodyCache[details.requestId];
        }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["responseHeaders", "blocking"]);
    });
</script>