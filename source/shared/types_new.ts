import type { Writable } from "../../node_modules/svelte/store";
import type { Deleter, Setter } from "../shared/types";

// Wrapper for all background writables
export interface WritableWrapper<Type> {
    store: Writable<Type>;
    set: Setter;
    del: Deleter;
};

export type AddSyncRequest = (req: SyncContentRequestRaw) => Promise<[any, string[]]>;

export interface BroadcastedRequest {
    handler: string;
    args:    any[];
};
export interface AsyncRequest extends BroadcastedRequest {
    type: "async",
};
export interface SyncContentRequestRaw extends BroadcastedRequest {
    type:     "sync",
    urlMatch: string;
}; // Request for communication with content scripts
export interface SyncContentRequest extends SyncContentRequestRaw {
    resolve: Function; 
}; // Idle handler until resolved

export interface BroadcastedResponse {
    payload: any; // any | string
};
export interface AsyncResponse extends BroadcastedResponse {
    result: "ok" | "error";
};
export interface SyncContentResponse extends BroadcastedResponse {
    result:  "ok" | "error" | "not-found";
    // payload undefined for not-found
    execute: string[];
};

// Ping request to check tab reactivity
export const pingRequest: AsyncRequest = {
    type: "async",
    handler: "ping",
    args: [],
};

// Default ping response for content script
export async function contentPing(): Promise<SyncContentResponse> {
    return {
        result: "ok",
        payload: "ping!",
        execute: [],
    };
}
