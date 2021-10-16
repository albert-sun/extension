import { Writable, get, writable } from "../../node_modules/svelte/store";
import type { DomainMatches, MessageHandlers } from "./types";
import type { BroadcastedRequest, BroadcastedResponse } from "./types_new";

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
    request: BroadcastedRequest
): Promise<BroadcastedResponse | string> {
    return await new Promise((resolve) => {
        browser.runtime.sendMessage(request)
            .then(response => resolve(response as BroadcastedResponse)) // Successful
            .catch(error => resolve((error as Error).message)); // Failed, no link
    });
}

// Initializes wrapper for sending messages from content script with key and params
export async function sendRequestBackground(handler: string, args: any[] = []): Promise<BroadcastedResponse> {
    // Construct request from parameters
    const request: BroadcastedRequest = {
        handler, args,
    }; 

    // Send message and wait for response
    const response = await browser.runtime.sendMessage(request) as BroadcastedResponse;
    
    return response;
};

// Initializes wrapper for sending messages from background or extension with key and params
// Must target individual tabs by glob, thus only sends to the first tab matched
export const domainMatches: DomainMatches = {
    "bestbuy": "https://*.bestbuy.com/*",
}; // Domain matches for sending messages from background or extension

/*
export async function sendMessageToContent(self: string, target: string, handler: string, args: any[] = []): Promise<MessageResponse> {
    // Construct request from parameters
    const request: MessageRequest = {
        sender: self,
        handler, args,
    }; 

    // Assume that tab always found, have failsafe?
    let response: MessageResponse = {
        status: "error",
        payload: "tab not found (shouldn't happen)",
    }; // Default response, overwritten if tab found
    const tabs = await browser.tabs.query({ 
        url: domainMatches[target] as string,
        discarded: false,
        status: "complete",
    }); // Might cause issues with discarded tabs?
    if(tabs.length > 0) { 
        // Only process on first content script, assume tab ID defined
        response = await browser.tabs.sendMessage(tabs[0].id as number, request);
    }
    
    return response;
};
*/

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