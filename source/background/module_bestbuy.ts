import { get } from "../../node_modules/svelte/store";
import { bestBuyDisplays } from "../shared/constants";
import { bestBuyQueues, settings } from "../shared/constants_new";
import type { BestBuyClientQueueData, BestBuySKUQueuesData, ProductQueueData } from "../shared/types";
import type { BroadcastedRequest } from "../shared/types_new";
import { bestBuyDecodeQueue, extensionLog, minutesSeconds } from "../shared/utilities_new";
import { addSyncRequest, createTabReady, soundNotification } from "./module_main";

interface AddToCartBody { 
    items: { skuId: string }[]; 
}; // Body sent with addToCart POST request

const loggingSelf = "background_bestbuy";
const bestBuyCartURL = "https://www.bestbuy.com/cart";
const bestBuyTabURL = "https://www.bestbuy.com/"; // For auto-opening tabs

// Setup add-to-cart request interception handlers thorugh webRequest API
export function setupBestBuyRequestHandlers() {
    extensionLog(loggingSelf, "Setting-up webRequest interception for addToCart requests")
    
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

            extensionLog(loggingSelf, `[webRequest.onBeforeRequest] Finished caching POST body for request ${details.requestId} with SKU(s) ${serializedSKUs}`, "debug");
        }
    }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["requestBody", "blocking"]); 
    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
        // Parse payload from cached request body
        const cachedBody = requestBodyCache[details.requestId]; // In case if somehow not cached
        if(cachedBody === undefined) {
            // Cached body doesn't exist, shouldn't happen
            extensionLog(loggingSelf, `[webRequest.onBeforeSendHeaders] Couldn't find cached POST body for request ${details.requestId}`, "error");
            
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
        if((details.statusCode !== 200 || get(settings.store)["bestbuy"]["requeueSuccess"] === true)
            && a2cTransactionReferenceId !== "" && a2cTransactionCode !== "") {
            // Retrieve SKU from cached request body, assume SKU is desired
            const cachedBody = requestBodyCache[details.requestId]; // In case if somehow not cached
            if(cachedBody === undefined) {
                // Cached body doesn't exist, shouldn't happen
                extensionLog(loggingSelf, `[webRequest.onHeadersReceived] Couldn't find cached POST body for request ${details.requestId}`, "error");
                
                return;
            }
            const sku = cachedBody.items[0]?.skuId; // Assume always defined
            // Decode remaining queue time from a2ctransactioncode
            const startTime = new Date().getTime(); // In milliseconds from epoch
            const queueTime = bestBuyDecodeQueue(a2cTransactionCode); 
            const [minutes, seconds] = minutesSeconds(queueTime); // Only for debugging purposes
            const queueData: ProductQueueData = { startTime, a2cTransactionReferenceId, a2cTransactionCode, queueTime };
            extensionLog(loggingSelf, `[webRequest.onHeadersReceived] Queue response headers detected for request ${details.requestId} with time ${minutes}m ${seconds}s`);
            // Construct and broadcast queue data through Writable
            let message: string = ""; // To be filled within statements
            const productName = bestBuyDisplays[sku];
            let existingQueues = get(bestBuyQueues.store)[sku] || {};
            // Either append to existing or replace queue depending on setting
            if(get(settings.store)["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                // Perform replacement and check whether new queue improved
                // existingQueues updated within updateReplaceQueues when ran
                // Note that existingQueues has to be re-set because no pass by value between files
                let shorter: boolean; let diffMinutes: number; let diffSeconds: number;
                ([existingQueues, shorter, diffMinutes, diffSeconds] = updateReplaceQueues(existingQueues, queueData, startTime));
                if(shorter === true) {
                    // Current queue has improvement, show notification
                    message = `[${productName}] Queue replacement enabled, replacing with ${diffMinutes}m ${diffSeconds}s improvement`;
                } else {
                    // No improvement, clear stragglers and show notification
                    message = `[${productName}] Queue replacement enabled, not replacing because ${diffMinutes}m ${diffSeconds}s worse`;
                }
                console.debug(shorter);
                console.debug(JSON.stringify(existingQueues));
            } else {
                message = `[${productName}] Intercepted new queue with timer ${minutes}m ${seconds}s`;
                // Otherwise, perform regular "appending" to queues
                existingQueues[a2cTransactionReferenceId] = queueData;
            }
            bestBuyQueues.set(sku, existingQueues);
            // Construct for sending notification with sound
            // Can't await soundNotification because async not allowed?
            const title = "Best Buy - Queue Intercepted";
            soundNotification("queue", title, message, ["bestbuy", "notificationQueue"]);
        }
        // Delete cached body with request ID to prevent memory leaks
        delete requestBodyCache[details.requestId];
    }, { urls: ["*://*.bestbuy.com/cart/api/v1/addToCart"]}, ["responseHeaders", "blocking"]);
}

// Update and replace queues for given existing queues, keeping the shortest
function updateReplaceQueues(
    existingQueues: BestBuySKUQueuesData, newQueueData: ProductQueueData, currentTime: number
): [BestBuySKUQueuesData, boolean, number, number] {
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
    const shortestQueue = existingQueuesMapped[0];
    existingQueues[shortestQueue[1]] = shortestQueue[2];
    
    return [existingQueues, shorter, diffMinutes, diffSeconds];
}

// Merge product queues retrieved from page with currently tracked queues
// Either append or merge to keep shortest depending on setting
export async function mergeProductQueues(mergeQueueData: BestBuyClientQueueData) {
    // Iterate over browser queue for each SKU, merging unseen with currently tracked
    const currentTime = new Date().getTime(); // In milliseconds from epoch
    for(const [sku, skuQueueData] of Object.entries(mergeQueueData)) {
        // Check whether queue with given ID is being tracked
        let existingQueues = get(bestBuyQueues.store)[sku] || {};
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
                
                // Check Best Buy setting to see whether replacement needed
                if(get(settings.store)["bestbuy"]["replaceQueue"] === true && Object.keys(existingQueues).length > 0) {
                    // Perform update and replacement with import queue
                    let shorter: boolean; let diffMinutes: number; let diffSeconds: number;
                    ([existingQueues, shorter, diffMinutes, diffSeconds] = updateReplaceQueues(existingQueues, queueData, startTime));
                    if(shorter === true) {
                        // Imported queue improvement
                        extensionLog(loggingSelf, `Importing queue for SKU ${sku} has ${diffMinutes}m ${diffSeconds}s improvement, replacing`);
                    } else {
                        // Worse imported queue, don't replace and ignore
                        extensionLog(loggingSelf, `Importing queue for SKU ${sku} worse by ${diffMinutes}m ${diffSeconds}s improvement, not replacing`);
                    }
                } else {
                    // Perform regular appending to existing list
                    if(negative === false) {
                        // Queue hasn't popped yet
                        extensionLog(loggingSelf, `Importing queue for SKU ${sku} with ${remainingMinutes}m ${remainingSeconds}s remaining`);
                    } else {
                        // Queue already popped but hasn't expired yet
                        extensionLog(loggingSelf, `Importing queue for SKU ${sku} already popped for ${remainingMinutes}m ${remainingSeconds}s`);
                    }
                }
                bestBuyQueues.set(sku, existingQueues);
            }
        }
    }
}

// Wrapper for processing add-to-cart by broadcasting to streamline handler
// Depending on settings and result status, plays sound and shows notifications
export async function processAddToCart(
    sku: string, a2cTransactionReferenceId?: string, a2cTransactionCode?: string
) {
    // Construct request for broadcasting to streamlined
    const syncRequest: BroadcastedRequest = {
        handler: "content-add_to_cart",
        args: [sku, a2cTransactionReferenceId, a2cTransactionCode],
    };

    // Keep broadcasting request until response gotten
    let processAddStatus: number;
    do {
        extensionLog(loggingSelf, "Broadcasting soon-queued synchronous add-to-cart request");

        let processAddResponse = await addSyncRequest(syncRequest, "bestbuy");
        if(processAddResponse.result === "error") {
            // Error performing request to background, should never happen
            extensionLog(loggingSelf, `Error performing streamlined add-to-cart request: ${processAddResponse.payload}`);

            return; // Add other handler eventually
        } else if(processAddResponse.result === "not-found") { // Failed to communicate with background
            // Check relevant global setting for action
            if(get(settings.store)["global"]["autoOpenTab"] === true) {
                extensionLog(loggingSelf, `Matching tab not found, creating new tab with url ${bestBuyTabURL}`);

                // Create matching tab and idle until ready
                await createTabReady(bestBuyTabURL);
                
                extensionLog(loggingSelf, `Tab creation finished, re-broadcasting initial request`);
                
                continue;
            } else { 
                extensionLog(loggingSelf, `Matching tab not found, showing notification and exiting`);

                // Play sound notification with given information
                const notificationId = await soundNotification(
                    "error",
                    "Best Buy - Tab Not Found",
                    "Matching tab not found or content script not responding. Open a matching tab or try reloading the page.",
                    ["global", "notificationNotFound"],
                );
                
                // Attach onclick handler to open matching tab when notification button clicked
                // Are there issues with memory leaks when listeners are added?
                browser.notifications.onButtonClicked.addListener(async function(clickedId, buttonIndex) {
                    // 0 index means open cart page
                    if(clickedId === notificationId && buttonIndex === 0) {
                        // Create tab but don't waste waiting to load
                        await createTabReady(bestBuyTabURL, false);
                    }
                });

                return;
            }
        }

        // Only remaining result possibility is ok
        processAddStatus = processAddResponse.payload.value;

        break;
    } while(true); // Keep looping, usually only requires single iteration

    // Show notification and play sound depending on status and settings            
    // Initialize variables in advance to prevent hard-coding?
    // TODO streamline callbacks and sending under if/else statements
    const productName = bestBuyDisplays[sku];
    // Handler ran okay, peform default actions
    if(processAddStatus === 200) {
        // Successfully carted (might not show in cart though)
        extensionLog(loggingSelf, `Successfully added ${productName} to cart`);

        // Play sound notification with given information
        const notificationId = await soundNotification(
            "success",
            "Best Buy - Successful Cart",
            productName,
            ["bestbuy", "notificationSuccess"],
        )
        
        // Attach onclick handler to open cart tab when notification button clicked
        // Are there issues with memory leaks when listeners are added?
        browser.notifications.onButtonClicked.addListener(async function(clickedId, buttonIndex) {
            // 0 index means open cart page
            if(clickedId === notificationId && buttonIndex === 0) {
                // Create tab but don't waste waiting to load
                await createTabReady(bestBuyCartURL, false);
            }
        });
    } else if(processAddStatus === 400) {
        // Failed to cart (either invalid queue or not avialable)
        extensionLog(loggingSelf, `Failed to cart ${productName}, either invaild queue or unavailable`);

        // Play sound notification with given information
        await soundNotification(
            "failure",
            "Best Buy - Failed to Cart",
            productName,
            ["bestbuy", "notificationFailure"]
        );
    } else {
        // Server error (500 rate limit, 403 rate limit or uncartable)
        // Can't reload tab from notification button because tab ID not returned, TODO?
        extensionLog(loggingSelf, `Error carting ${productName} with status ${status}`);

        // Construct custom message for error
        let message: string;
        if(get(settings.store)["bestbuy"]["autoReload"] === true) {
            message = `Error carting ${productName} - possible rate limiting, automatically reloading tab and retrying request`;
        } else {
            message = `Error carting ${productName} - possible rate limiting, not automatically reloading tab`;
        }

        // Play sound notification with given information
        await soundNotification(
            "error",
            `Best Buy - Error ${status}`,
            message,
            ["bestbuy", "notificationError"]
        );
    }
}