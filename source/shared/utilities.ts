import { Writable, get, writable } from "../../node_modules/svelte/store";
import type { DomainMatches, MessageHandlers, MessageRequest, MessageResponse } from "./types";

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
export async function initializeStore<Type>(self: string, key: string, defaultValue: Type) {
    // Initialize writable store from storage value
    const storageValue = await storageGet<Type>(key, defaultValue);
    const store: Writable<Type> = writable(storageValue);

    // Instantiate setter and getter for broadcasting updates
    // Assume that both key and value are indexable by string
    const set = (setKey: string, setValue: any) => {
        store.update(value => { (value as any)[setKey] = setValue; return value });
        browser.storage.local.set({ [key]: get(store) })
        sendMessageToBackground(self, "update-set", [key, setKey, setValue]);
    }; // Setter to broadcast key set update
    const del = (delKey: string) => {
        store.update(value => { delete (value as any)[delKey]; return value });
        browser.storage.local.set({ [key]: get(store) })
        sendMessageToBackground(self, "update-del", [key, delKey]);
    }; // Deleter to broadcast key delete update

    // Attach additional message listener to listen for updates
    browser.runtime.onMessage.addListener(async (message, sender) => {
        // Check whether key matches and perform update or deletion
        const request = message as MessageRequest;
        console.log(request);
        if(request.handler === "update-set") {
            // Deconstruct arguments and set/replace key in store
            const [storeKey, setKey, setValue] = request.args as [string, string, any];
            if(storeKey === key) { // Ensure key matches before setting
                // DO NOT use setter, otherwise update broadcasts in loop
                console.log(get(store));
                store.update(value => { (value as any)[setKey] = setValue; return value });
                console.log(get(store));
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

// Initializes wrapper for sending messages from content script with key and params
export async function sendMessageToBackground(self: string, handler: string, args: any[] = []): Promise<MessageResponse> {
    // Construct request from parameters
    const request: MessageRequest = {
        sender: self,
        handler, args,
    }; 

    // Send message and wait for response
    const response = await browser.runtime.sendMessage(request) as MessageResponse;
    
    return response;
};

// Initializes wrapper for sending messages from background or extension with key and params
// Must target individual tabs by glob, thus only sends to the first tab matched
const domainMatches: DomainMatches = {
    "bestbuy": "https://*.bestbuy.com/*",
}; // Domain matches for sending messages from background or extension
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
    const tabs = await browser.tabs.query({ url: domainMatches[target] as string });
    if(tabs.length > 0) { 
        // Only process on first content script, assume tab ID defined
        response = await browser.tabs.sendMessage(tabs[0].id as number, request);
    }
    
    return response;
};

// Initializes message receiving for given content script with key and handlers
export function messageProcessHandlers(contentKey: string, handlers: MessageHandlers, validSenders: string[]) {
    // Setup listener for snooping messages and executing matching handlers
    browser.runtime.onMessage.addListener(async (message, sender) => {
        const request = message as MessageRequest;
        let response: MessageResponse = { 
            status: "success", 
            payload: undefined 
        }; // Placeholder response before construction
            
        // Only process incoming messages from valid senders
        if(validSenders.includes(request.sender)) {
            // Check whether handler exists, messages are targeted
            const handler = handlers[request.handler];
            if(handler !== undefined) {
                extensionLog(contentKey, `Processing handler ${request.handler} from ${request.sender} with arguments ${JSON.stringify(request.args)}`);

                // Handler exists, attempt to execute
                try {
                    const result = await handler(...request.args || []);
                    response.status = "success";
                    response.payload = result; // Non-serialized
                } catch(error) {
                    const errorMessage = (error as Error).message;
                    response.status = "error";
                    response.payload = errorMessage;

                    extensionLog(contentKey, `Error processing handler ${request.handler}: ${errorMessage}`, "error");
                }
            } else {
                extensionLog(contentKey, `Error, given handler ${request.handler} doesn't exist`, "error");

                // Handler doesn't exist, return notify
                response.status = "not-found";
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