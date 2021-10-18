// Interfaces for streamlining queued requests streamlinely
export interface StreamlinedRequestRaw {
    urlMatch: string;   // URL to query tabs for
    handler:  string;   // Name of handler
    args:     any[];
}; // Currently queued request within streamline background script
export interface StreamlinedRequest extends StreamlinedRequestRaw {
    resolve:  Function; // Idle until resolved
}; // Original broadcaster idles until execution finished and resolved
export interface StreamlinedResponse {
    status:   string;              // okay / no-tabs
    payload?: BroadcastedResponse; // Response or error message
}; // Response from queued request returned to original broadcaster
export interface BroadcastedRequest {
    handler: string;
    args:    any[];
}; // Request payload broadcasted to targeted tab
export interface BroadcastedResponse {
    result:  string; // ok / error
    payload: HandlerResponse;
}; // Response payload from targeted tab, includes extra instructions
export interface HandlerResponse {
    value: any;
    execute?: string[]; // reload
};

// Ping request to check tab reactivity
export const pingRequest: BroadcastedRequest = {
    handler: "ping",
    args: [],
};

// Default ping response for content script
export async function contentPing(): Promise<HandlerResponse> {
    return {
        value: "okay",
    };
}
