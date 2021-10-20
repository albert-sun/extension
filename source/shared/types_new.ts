import type { Writable } from "../../node_modules/svelte/store";
import type { Deleter, Setter } from "../shared/types";

// Wrapper for all background writables
export interface WritableWrapper<Type> {
    store: Writable<Type>;
    set: Setter;
    del: Deleter;
};

export interface BroadcastedRequest {
    handler: string;
    args:    any[];
};
export interface BroadcastedResponse {
    result:  "ok" | "error" | "not-found";
    payload: ResponsePayload;
};
export interface ResponsePayload {
    value:   any;
    execute: string[];
};
export interface SyncRequest extends BroadcastedRequest {
    urlMatch: string;
    resolve:  Function; // Idle until resolution
};

// Ping request to check tab reactivity
export const pingRequest: BroadcastedRequest = {
    handler: "ping",
    args: [],
};

// Default ping response for content script
export async function contentPing(): Promise<BroadcastedResponse> {
    return {
        result: "ok",
        payload: {
            value: "ping!",
            execute: [],
        }
    };
}
