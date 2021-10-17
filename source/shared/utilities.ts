import { Writable, get, writable } from "../../node_modules/svelte/store";
import type { DomainMatches, MessageHandlers } from "./types";
import type { BroadcastedRequest, BroadcastedResponse } from "./types_new";

export const domainMatches: DomainMatches = {
    "bestbuy": "https://*.bestbuy.com/*",
}; // Domain matches for sending messages from background or extension

// Somewhat fancy logging from extension background
export function extensionLog(sender: string, message: string, level: string = "info") {
    // Generate timestmap for logging in 24-hour HH:MM:SS format
    const timestamp = (new Date()).toLocaleTimeString('en-GB', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).substring(0, 8);

    // Log or error to console (currently without formatting)
    const output = `[${timestamp}]\t\t(${sender})\t\t${message}`;
    if(level === "info") {
        console.log(output);
    } else if(level === "debug") {
        console.debug(output);
    } else if(level === "warn") {
        console.warn(output);
    } else if(level === "error") {
        console.error(output);
    }
}

// Initialize writable store from Storage API and maintain value using subscriptions
export async function initializeStore<Type>(key: string, defaultValue: Type) {
    // Initialize writable store from storage value
    const storageValue = await storageGet<Type>(key, defaultValue);
    const store: Writable<Type> = writable(storageValue);

    // Instantiate setter and getter for broadcasting updates
    // Assume that both key and value are indexable by string
    const set = (setKey: string, setValue: any) => {
        store.update(value => { (value as any)[setKey] = setValue; return value });
        browser.storage.local.set({ [key]: get(store) })
        sendRequestBackground("update-set", [key, setKey, setValue]);
    }; // Setter to broadcast key set update
    const del = (delKey: string) => {
        store.update(value => { delete (value as any)[delKey]; return value });
        browser.storage.local.set({ [key]: get(store) })
        sendRequestBackground("update-del", [key, delKey]);
    }; // Deleter to broadcast key delete update

    // Attach additional message listener to listen for updates
    browser.runtime.onMessage.addListener(async (message, sender) => {
        // Check whether key matches and perform update or deletion
        const request = message as BroadcastedRequest;
        if(request.handler === "update-set") {
            // Deconstruct arguments and set/replace key in store
            const [storeKey, setKey, setValue] = request.args as [string, string, any];
            if(storeKey === key) { // Ensure key matches before setting
                // DO NOT use setter, otherwise update broadcasts in loop
                store.update(value => { (value as any)[setKey] = setValue; return value });
            }
        } else if(request.handler === "update-delete") {
            // Deconstruct arguments and delete key from store
            const [storeKey, delKey] = request.args as [string, string];
            if(storeKey === key) {
                // DO NOT use deleter, otherwise update broadcasts in loop
                store.update(value => { delete (value as any)[delKey]; return value });
            }
        }
    });

    return {store, set, del};
}

// Resolve/reject wrapper for sending messages to background
// Currently doesn't implement timeout but maybe later?
async function sendMessageBackground(
    request: BroadcastedRequest,
): Promise<BroadcastedResponse | string> {
    return await new Promise((resolve) => {
        browser.runtime.sendMessage(request)
            .then(response => resolve(response as BroadcastedResponse)) // Successful
            .catch(error => resolve((error as Error).message)); // Failed, no link
    });
}

// Initializes wrapper for sending messages from content script with key and params
export async function sendRequestBackground(handler: string, args: any[] = []): Promise<BroadcastedResponse | string> {
    // Construct request from parameters
    const request: BroadcastedRequest = {
        handler, args,
    }; 

    // Send message and wait for response
    const response = await sendMessageBackground(request);
    
    return response;
};

// Initializes message receiving for given content script with key and handlers
export function messageProcessHandlers(contentKey: string, handlers: MessageHandlers, validSenders: string[]) {
    // Setup listener for snooping messages and executing matching handlers
    browser.runtime.onMessage.addListener(async (message, sender) => {
        const request = message as BroadcastedRequest;
        let response: BroadcastedResponse = { 
            result: "success", 
            payload: {
                value: undefined,
            },
        }; // Placeholder response before construction
            
        // Check whether handler exists, messages are targeted
        const handler = handlers[request.handler];
        if(handler !== undefined) {
            extensionLog(contentKey, `Processing handler ${request.handler} with arguments ${JSON.stringify(request.args)}`);

            // Handler exists, attempt to execute
            try {
                const payload = await handler(...request.args || []);
                response.result = "okay";
                response.payload = payload; // Non-serialized
            } catch(error) {
                const errorMessage = (error as Error).message;
                response.result = "error";
                response.payload.value = errorMessage;

                extensionLog(contentKey, `Error processing handler ${request.handler}: ${errorMessage}`, "error");
            }
        } 

        return response;
    });
}

// Retrieve value with given key from Storage API
export async function storageGet<Type>(key: string, defaultValue: Type): Promise<Type> {
    // Retrieve from storage and "overwrite" with default if not found
    const storageContent = await browser.storage.local.get(key) as { [s: string]: Type };
    if(storageContent[key] === undefined) {
        storageContent[key] = defaultValue;
    }

    return storageContent[key];
}

// Store with the given key the value through the Storage API
export async function storageSet<Type>(key: string, value: Type) {
    // Store using the given key and value
    await browser.storage.local.set({ [key]: value });
}

// Opens URL instead of using href attribute for anchor
export function openPage(url: string, active = false) {
    browser.tabs.create({
        url: url,
        active: active,
    });
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// https://stackoverflow.com/questions/24558442/is-there-something-like-glob-but-for-urls-in-javascript
export function urlGlob(pattern: string, input: string) {
    var re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*'));
    return re.test(input);
}

// Decodes the queue code to the number of milliseconds
export function decodeQueue(queueCode: string) {
    const splitCode = queueCode.split("-");
    const parsedCode = splitCode.map(chunk => parseInt(chunk, 16));
    // if(parsedCode[1] * parsedCode[2] * parsedCode[3] === parsedCode[4])
    const waitDuration = 100 * 10 * parseInt(splitCode[2] + splitCode[3], 16) / parsedCode[1];
    
    return waitDuration;
}

// Calculates the number of minutes and seconds for queue
export function minutesSeconds(totalMilliSeconds: number, truncate = false): [number, number, boolean] {
    // Bypass functionality for negative times
    let negative = false;
    if(totalMilliSeconds < 0) {
        totalMilliSeconds = totalMilliSeconds * -1;
        negative = true;
    }

    const totalSeconds = totalMilliSeconds / 1000;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Truncate numbers if desired
    if(truncate === true) {
        minutes = Math.floor(minutes);
        seconds = Math.floor(seconds);
    }

    return [minutes, seconds, negative]
}