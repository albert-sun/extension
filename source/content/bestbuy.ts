import { bestBuyDisplays, contentSelf } from "../shared/constants";
import type { MessageHandlers, QueueData } from "../shared/types";
import { extensionLog, messageProcessHandlers, sendMessageToBackground } from "../shared/utilities";

const self = contentSelf; // Content script identifier
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

    // Show notification notifying of potential rate-limit?
    const productName = bestBuyDisplays[sku];
    if(response.status === 200) {
        // Construct for sending notification with sound
        const title = "Best Buy - Successfully Carted";
        const message = productName;
        await sendMessageToBackground(self, "sound-notification", [
            "success", title, message, 
            ["bestbuy-notifications", "notificationSuccess"],
        ]); // Send category and settings key instead of setting
    } if(response.status === 400) {
        // Construct for sending notification with sound
        const title = a2cTransactionCode !== undefined
            ? "Best Buy - Failed to Cart" : "Best Buy - Failed to Cart With Queue";
        const message = productName;
        await sendMessageToBackground(self, "sound-notification", [
            "failure", title, message, 
            ["bestbuy-notifications", "notificationFailure"],
        ]); // Send category and settings key instead of setting
    } else if(response.status !== 200) {
        // Construct for sending notification with sound
        const title = "Best Buy - Potential Rate-Limiting";
        const message = `[${productName}] Potential rate-limiting on add-to-cart request with status ${response.status}, try reloading the tab!`;
        await sendMessageToBackground(self, "sound-notification", [
            "rateLimit", title, message, 
            ["bestbuy-notifications", "notificationRateLimit"],
        ]); // Send category and settings key instead of setting
    }

    return response.status;
}

// General startup routine for content script
async function startup() {
    // - Setup message receiving handlers and sending wrapper
    messageProcessHandlers(self, messageHandlers, ["content", "background", "extension"]); 

    extensionLog(self, "Finished processing content script startup routine");
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