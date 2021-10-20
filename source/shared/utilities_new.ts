import { get, writable, Writable } from "../../node_modules/svelte/store";
import type { MessageHandlers } from "./types";
import { AddSyncRequest, AsyncRequest, AsyncResponse, pingRequest, SyncContentRequestRaw, SyncContentResponse } from "./types_new";

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// https://stackoverflow.com/questions/24558442/is-there-something-like-glob-but-for-urls-in-javascript
export function urlGlob(pattern: string, input: string) {
    var re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*'));
    return re.test(input);
}

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

// Initializes message receiving for given content script with key and handlers
export function messageProcessHandlers(
    contentKey: string, handlers: MessageHandlers, addSyncRequest?: AddSyncRequest,
) {
    // Setup listener for snooping messages and executing matching handlers
    browser.runtime.onMessage.addListener(async (message, sender) => {
        const request = message as AsyncRequest | SyncContentRequestRaw;
        console.log("receive");
        console.log(request);

        // Check whether handler exists, messages are targeted
        const handler = handlers[request.handler];
        if(request.type === "sync" || handler !== undefined) {
            console.log("got");

            extensionLog(contentKey, `Processing ${request.type} handler ${request.handler} with arguments ${JSON.stringify(request.args)}`);

            if(request.type === "async") {
                // Prepare response beforehand
                const response: AsyncResponse = {
                    result: "ok",
                    payload: undefined,
                };

                // Return errored result if thrown
                try {
                    // Execute handler asynchronously
                    const payload = await handler(...request.args || []);
                    response.payload = payload;
                } catch(err) {
                    response.result = "error";
                    response.payload = (err as Error).message;
                }

                return response;
            } else if(request.type === "sync") {
                console.log("sync");

                // Prepare response beforehand
                const response: SyncContentResponse = {
                    result: "ok",
                    payload: undefined,
                    execute: [],
                }

                // Return errored response if thrown
                addSyncRequest = addSyncRequest as AddSyncRequest;
                try {
                    // Execute handler synchronously
                    const [payload, execute] = await addSyncRequest(request);
                    response.payload = payload;
                    response.execute = execute;
                } catch(err) {
                    response.result = "error";
                    response.payload = (err as Error).message;
                }

                return response;
            }
        } 

        throw new Error(`couldn't find handler ${request.handler}`);
    });
}

// Resolve/reject wrapper for sending asynchronous requests to background
// Currently doesn't implement timeout but maybe later?
export async function sendRequestBackgroundAsync(
    request: AsyncRequest,
): Promise<AsyncResponse> {
    console.log("async");
    console.log(request);
    return await new Promise((resolve) => {
        browser.runtime.sendMessage(request)
            .then(response => resolve(response as AsyncResponse)) // Successful
            .catch(error => resolve({
                result: "error",
                payload: (error as Error).message,
            })); // Failed, probably no message link
    });
}

// Resolve/reject wrapper for sending synchronous requests to background
// Currently doesn't implement timeout but maybe later?
export async function sendRequestBackgroundSync(
    request: SyncContentRequestRaw,
): Promise<SyncContentResponse> {
    console.log("sync");
    console.log(request);
    return await new Promise((resolve) => {
        browser.runtime.sendMessage(request)
            .then(response => resolve(response as SyncContentResponse)) // Successful
            .catch(error => resolve({
                result: "error",
                payload: (error as Error).message,
                execute: [],
            })); // Failed, probably no message link
    });
}

// Resolve/reject wrapper for sending asynchronous requests to tab
// Currently doesn't implement timeout but maybe later?
export async function sendRequestContentAsync(
    tabId: number, request: AsyncRequest
): Promise<AsyncResponse> {
    console.log("tab");
    console.log(request);
    return await new Promise((resolve) => {
        browser.tabs.sendMessage(tabId, request)
            .then(response => resolve(response as AsyncResponse)) // Successful
            .catch(error => resolve({
                result: "error",
                payload: (error as Error).message,
            })); // Failed, probably no message link
    });
}

// Retrieve value with given key from Storage API or return default
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

// Initialize writable store from Storage API and maintain value using subscriptions
export async function initializeStore<Type>(key: string, defaultValue: Type) {
    // Initialize writable store from storage value
    const storageValue = await storageGet<Type>(key, defaultValue);
    const store: Writable<Type> = writable(storageValue);

    // Instantiate setter and getter for broadcasting updates
    // Assume that both key and value are indexable by string
    const set = (setKey: string, setValue: any) => {
        // Update writable store and Storage API
        store.update(value => { (value as any)[setKey] = setValue; return value });
        browser.storage.local.set({ [key]: get(store) });

        // Throw and forget update broadcast
        const updateRequest: AsyncRequest = {
            type: "async",
            handler: "update-set",
            args: [key, setKey, setValue],
        };
        sendRequestBackgroundAsync(updateRequest);
    }; // Setter to broadcast key set update
    const del = (delKey: string) => {
        // Update writable store and Storage API
        store.update(value => { delete (value as any)[delKey]; return value });
        browser.storage.local.set({ [key]: get(store) });

        // Throw and forget update broadcast
        const updateRequest: AsyncRequest = {
            type: "async",
            handler: "update-del",
            args: [key, delKey],
        };
        sendRequestBackgroundAsync(updateRequest);
    }; // Deleter to broadcast key delete update

    // Attach additional message listener to listen for updates
    browser.runtime.onMessage.addListener(async (message, sender) => {
        // Check whether key matches and perform update or deletion
        const request = message as AsyncRequest;
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

// Periodically ping tab until response (ready)
// Note that unresponsive tabs will get pinged forever
export async function pingTabReady(tabId: number, pollingInterval: number, ready: boolean = true) {
    // Keep pinging until tab responds
    while(ready === true) {
        const pingResponse = await sendRequestContentAsync(tabId, pingRequest);
        console.log(pingResponse);
        if(pingResponse !== undefined && typeof pingResponse !== "string") { // Successfully communicated with tab
            break;
        }
        await sleep(pollingInterval);
    }
}

// Calculates the number of minutes and seconds from milliseconds
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

// Decodes the queue code to the queue time in milliseconds
export function bestBuyDecodeQueue(queueCode: string) {
    const splitCode = queueCode.split("-");
    const parsedCode = splitCode.map(chunk => parseInt(chunk, 16));
    // if(parsedCode[1] * parsedCode[2] * parsedCode[3] === parsedCode[4])
    const waitDuration = 100 * 10 * parseInt(splitCode[2] + splitCode[3], 16) / parsedCode[1];
    
    return waitDuration;
}

// Open a page with the given URL and whether to make active
export function openPage(url: string, active = false) {
    browser.tabs.create({
        url: url,
        active: active,
    });
}