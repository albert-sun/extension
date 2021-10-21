import type { BroadcastedRequest, DomainMatches } from "./types";

// Aggregate self-identification keys
export const backgroundSelf = "background";
export const contentSelf = "content";
export const extensionSelf = "extension";
export const domainMatches: DomainMatches = {
    "bestbuy": "https://*.bestbuy.com/*",
}; // Domain matches for sending messages from background or extension
export const pingRequest: BroadcastedRequest = {
    handler: "ping",
    args: [],
}; // Ping request to check tab reactivity
