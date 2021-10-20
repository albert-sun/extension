<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { bestBuyDisplays } from "../../shared/constants";
    import type { BestBuyClientQueueData, BestBuyQueuesData, BestBuySKUQueuesData, MessageHandlers, ProductQueueData, Settings } from "../../shared/types";
    import type { AsyncRequest, SyncContentRequestRaw, WritableWrapper } from "../../shared/types_new";
    import { bestBuyDecodeQueue, extensionLog, initializeStore, messageProcessHandlers, minutesSeconds, sendRequestBackgroundAsync, sendRequestBackgroundSync } from "../../shared/utilities_new";

    const self = "background_bestbuy";
    const bestBuyCartURL = "https://www.bestbuy.com/cart";
    const bestBuyTabURL = "https://www.bestbuy.com/"; // For auto-opening tabs
    // Initialize writables beforehand to prevent errors
    let bestBuyQueues: WritableWrapper<BestBuyQueuesData>;
    let bestBuyQueues_store: Writable<BestBuyQueuesData>; // For $ referencing
    let settings: WritableWrapper<Settings>;
    let settings_store: Writable<Settings>; // For $ referencing
    
    // Update and replace queues for given existing queues, keeping the shortest
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

    // Merge product queues retrieved from page with currently tracked queues
    // Either append or merge to keep shortest depending on setting
    async function mergeProductQueues(mergeQueueData: BestBuyClientQueueData) {
        // Iterate over browser queue for each SKU, merging unseen with currently tracked
        const currentTime = new Date().getTime(); // In milliseconds from epoch
        for(const [sku, skuQueueData] of Object.entries(mergeQueueData)) {
            // Check whether queue with given ID is being tracked
            const existingQueues = $bestBuyQueues_store[sku] || {};
            if(existingQueues[skuQueueData[1]] === undefined) {
                // Decode queue and remaining time from data
                const [startTime, a2cTransactionReferenceId, a2cTransactionCode] = skuQueueData;
                const queueTime = bestBuyDecodeQueue(skuQueueData[1]); 
                const remainingTime = startTime + queueTime - currentTime;
                const [remainingMinutes, remainingSeconds, negative] = minutesSeconds(remainingTime);
                
                // Don't bother adding if queue already expired
                if(remainingTime > -5 * 60 * 1000) {
                    // Construct and store queue data for given SKU, then append or replace existing
                    // existingQueues updated within updateReplaceQueues when ran
                    const queueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };
                    const existingQueues = $bestBuyQueues_store[sku] || {};
                    
                    // Check Best Buy setting to see whether replacement needed
                    if($settings_store["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                        // Perform update and replacement with import queue
                        const [shorter, diffMinutes, diffSeconds] = updateReplaceQueues(existingQueues, queueData, currentTime);
                        if(shorter === true) {
                            // Imported queue improvement
                            extensionLog(self, `Importing queue for SKU ${sku} has ${diffMinutes}m ${diffSeconds}s improvement, replacing`);
                        } else {
                            // Worse imported queue, don't replace and ignore
                            extensionLog(self, `Importing queue for SKU ${sku} worse by ${diffMinutes}m ${diffSeconds}s improvement, not replacing`);
                        }
                    } else {
                        // Perform regular appending to existing list
                        if(negative === false) {
                            // Queue hasn't popped yet
                            extensionLog(self, `Importing queue for SKU ${sku} with ${remainingMinutes}m ${remainingSeconds}s remaining`);
                        } else {
                            // Queue already popped but hasn't expired yet
                            extensionLog(self, `Importing queue for SKU ${sku} already popped for ${remainingMinutes}m ${remainingSeconds}s`);
                        }
                    }
                    bestBuyQueues.set(sku, existingQueues);
                }
            }
        }
    }

    // Wrapper for processing add-to-cart by broadcasting to streamline handler
    // Depending on settings and result status, plays sound and shows notifications
    async function processAddToCart(
        sku: string, a2cTransactionReferenceId?: string, a2cTransactionCode?: string
    ) {
        // Construct request for broadcasting to streamlined
        const syncRequest: SyncContentRequestRaw = {
            type: "sync",
            urlMatch: "bestbuy",
            handler: "content-add_to_cart",
            args: [sku, a2cTransactionReferenceId, a2cTransactionCode],
        };

        // Keep broadcasting request until response gotten
        let processAddStatus: number;
        do {
            extensionLog(self, "Broadcasting soon-queued synchronous add-to-cart request");

            let processAddResponse = await sendRequestBackgroundSync(syncRequest);
            if(processAddResponse.result === "error") {
                // Error performing request to background, should never happen
                extensionLog(self, `Error performing streamlined add-to-cart request: ${processAddResponse.payload}`);

                return; // Add other handler eventually
            } else if(processAddResponse.result === "not-found") { // Failed to communicate with background
                // Check relevant global setting for action
                if($settings_store["global"]["autoOpenTab"] === true) {
                    extensionLog(self, `Matching tab not found, creating new tab with url ${bestBuyTabURL}`);

                    // Broadcast create tab to background and idle until ready
                    const createTabRequest: AsyncRequest = {
                        type: "async",
                        handler: "create-tab-ready",
                        args: [],
                    }
                    await sendRequestBackgroundAsync(createTabRequest);
                    
                    extensionLog(self, `Tab creation finished, re-broadcasting initial request`);
                    
                    continue;
                } else { 
                    extensionLog(self, `Matching tab not found, showing notification and exiting`);

                    // Instead, just broadcast sound notification to background
                    const soundNotificationRequest: AsyncRequest = {
                        type: "async",
                        handler: "sound-notification",
                        args: [
                            "error",
                            "Best Buy - Tab Not Found",
                            "Matching tab not found or content script not responding. Open a matching tab or try reloading the page.",
                            ["global", "notificationNotFound"],
                        ]
                    };
                    const notificationResponse = await sendRequestBackgroundAsync(soundNotificationRequest);
                    const notificationId = notificationResponse.payload as string; // Too lazy to implement error catching
                    
                    // Attach onclick handler to open matching tab when notification button clicked
                    // Are there issues with memory leaks when listeners are added?
                    browser.notifications.onButtonClicked.addListener(async function(clickedId, buttonIndex) {
                        // 0 index means open cart page
                        if(clickedId === notificationId && buttonIndex === 0) {
                            // Broadcast create tab to background but don't waste waiting for load
                            const createTabRequest: AsyncRequest = {
                                type: "async",
                                handler: "create-tab-ready",
                                args: [bestBuyTabURL, false],
                            }
                            await sendRequestBackgroundAsync(createTabRequest);
                        }
                    });

                    return;
                }
            }

            // Only remaining result possibility is ok
            processAddStatus = processAddResponse.payload;

            break;
        } while(true); // Keep looping, usually only requires single iteration

        // Setup default for notification depending on status
        const soundNotificationRequest: AsyncRequest = {
            type: "async",
            handler: "sound-notification",
            args: []
        };

        // Show notification and play sound depending on status and settings            
        // Initialize variables in advance to prevent hard-coding?
        // TODO streamline callbacks and sending under if/else statements
        const productName = bestBuyDisplays[sku];
        // Handler ran okay, peform default actions
        if(processAddStatus === 200) {
            // Successfully carted (might not show in cart though)
            extensionLog(self, `Successfully added ${productName} to cart`);

            // Broadcast sound notification to background
            soundNotificationRequest.args = [
                "success",
                "Best Buy - Successful Cart",
                productName,
                ["bestbuy", "notificationSuccess"]
            ];
            const notificationResponse = await sendRequestBackgroundAsync(soundNotificationRequest);
            const notificationId = notificationResponse.payload as string; // Too lazy to implement error catching
            
            // Attach onclick handler to open cart tab when notification button clicked
            // Are there issues with memory leaks when listeners are added?
            browser.notifications.onButtonClicked.addListener(async function(clickedId, buttonIndex) {
                // 0 index means open cart page
                if(clickedId === notificationId && buttonIndex === 0) {
                    // Broadcast create tab to background but don't waste waiting for load
                    const createTabRequest: AsyncRequest = {
                        type: "async",
                        handler: "create-tab-ready",
                        args: [bestBuyCartURL, false],
                    }
                    await sendRequestBackgroundAsync(createTabRequest);
                }
            });
        } else if(processAddStatus === 400) {
            // Failed to cart (either invalid queue or not avialable)
            extensionLog(self, `Failed to cart ${productName}, either invaild queue or unavailable`);

            // Broadcast sound notification to background
            soundNotificationRequest.args = [
                "failure",
                "Best Buy - Failed to Cart",
                productName,
                ["bestbuy", "notificationFailure"]
            ];
            await sendRequestBackgroundAsync(soundNotificationRequest);
        } else {
            // Server error (500 rate limit, 403 rate limit or uncartable)
            // Can't reload tab from notification button because tab ID not returned, TODO?
            extensionLog(self, `Error carting ${productName} with status ${status}`);

            // Construct custom message for error
            let message: string;
            if($settings_store["bestbuy"]["autoReload"] === true) {
                message = `Error carting ${productName} - possible rate limiting, automatically reloading tab and retrying request`;
            } else {
                message = `Error carting ${productName} - possible rate limiting, not automatically reloading tab`;
            }

            // Broadcast sound notification to background
            soundNotificationRequest.args = [
                "error",
                `Best Buy - Error ${status}`,
                message,
                ["bestbuy", "notificationError"]
            ];
            await sendRequestBackgroundAsync(soundNotificationRequest);
        }
    }

    // Async doesn't include destructor, don't care
    onMount(async function() {
        // Initialize stores from Storage API
        bestBuyQueues = await initializeStore<BestBuyQueuesData>( "bestbuy-queues", {});
        bestBuyQueues_store = bestBuyQueues.store;
        settings = await initializeStore<Settings>( "settings", {});
        settings_store = settings.store; 

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            "merge-product_queues": mergeProductQueues,
            "background-add_to_cart": processAddToCart,
        }; // Message handlers for processing from Messages API
        messageProcessHandlers(self, messageHandlers);
    });
</script>