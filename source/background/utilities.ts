import type { BroadcastedRequest, BroadcastedResponse } from "../shared/types_new";
import { storageGet, storageSet } from "../shared/utilities";

// Broadcast message using the background identifier
export async function broadcastMessage(
    handler: string, ...args: any
): Promise<BroadcastedResponse> {
    const request: BroadcastedRequest = {
        handler, args,
    };

    const response = await browser.runtime.sendMessage(request) as BroadcastedResponse;

    return response;
}

// Retrieves object with the specified key from the Storage API
// Also broadcasts individual changes (set, delete) to the object through the Messages API
export async function mirrorStorage<Type>(
    storageKey: string, defaultValue: Type, broadcast: boolean = true
): Promise<Type> {
    // Retrieve existing object from Storage API or use defualt
    const data = await storageGet(storageKey, defaultValue as any);
    const proxiedData = new Proxy(data, {
        set: function(target: any, key, value) {
            target[key] = value;
            storageSet(storageKey, data); // Throw and forget

            // Broadcast update through Messages API if enabled
            if(broadcast === true) {
                broadcastMessage("updateSet", [storageKey, key, value]);
            }

            return target;
        },
        deleteProperty: function(target, key) {
            // Make sure that key exists before deleting
            if(target[key] !== undefined) {
                delete target[key];
                storageSet(storageKey, data); // Throw and forget

                // Broadcast update through Messages API if enabled
                if(broadcast === true) {
                    broadcastMessage("updateDelete", [storageKey, key]);
                }

                return true;
            }  

            return false;
        }
    }) as Type;

    return proxiedData;
}