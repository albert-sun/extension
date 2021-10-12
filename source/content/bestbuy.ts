import type { MessageHandlers, QueueData } from "../shared/types";
import { extensionLog, messageProcessHandlers, sendMessageToBackground } from "../shared/utilities";

const contentKey = "content_bestbuy"; // Content script identifier
const messageHandlers: MessageHandlers = {
    "process-atc": processAddtoCart,
}; // Message handlers for processing from Messages API

// Send add-to-cart request, optionally with (assuming popped) queue data
// Only return success / failure / error results, ignore new queue and response content
async function processAddtoCart(sku: string, a2cTransactionReferenceId?: string, a2cTransactionCode?: string): Promise<any> {
    // Initialize headers and additionally add queue data if defined
    const headers: { [name: string]: string } = {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json; charset=UTF-8",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    };
    if(a2cTransactionReferenceId !== undefined) { headers["a2ctransactionreferenceid"] = a2cTransactionReferenceId; }
    if(a2cTransactionCode !== undefined) { headers["a2ctransactioncode"] = a2cTransactionCode; }
    
    // Process add-to-cart request and check response status for result
    const response = await fetch("https://www.bestbuy.com/cart/api/v1/addToCart", {
        "headers": headers,
        "referrer": "https://www.bestbuy.com/cart",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{"items":[{"skuId":"${sku}"}]}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include",
    });

    return response.status === 200
        ? "success" : response.status === 400
        ? "failure" : "error"; // Return depending on status code
}

// General startup routine for content script
async function startup() {
    // - Setup message receiving handlers and sending wrapper
    messageProcessHandlers(contentKey, messageHandlers, ["background", "extension"]); 

    extensionLog(contentKey, "Finished processing content script startup routine");
}

// Content script runtime processing on-load
async function runtime() {
    // Send updated raw queue info to background
    // Can't intercept requests, instead intercept data manually?
    const serializedQueueData = atob(localStorage.getItem("purchaseTracker") || "e30=");
    const queueData = JSON.parse(serializedQueueData) as QueueData;
    sendMessageToBackground("content_best-buy", "merge-bestbuy-product_queues", [queueData]); // Throw and forget
}

await startup();
await runtime();