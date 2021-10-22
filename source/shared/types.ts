import type { Writable } from "../../node_modules/svelte/store";
import type { SvelteComponent } from "../../node_modules/svelte/types/runtime";

// Wrapper for all background writables
export interface WritableWrapper<Type> {
    store: Writable<Type>;
    set: Setter;
    del: Deleter;
};
export type Setter = (setKey: string, setValue: any) => void;
export type Deleter = (delKey: string) => void;

// Types for broadcasted requests through Messages API
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

// Navigation selectable item with display, key, and component
export interface NavigationItem {
    display: string;
    key: string;
    component: typeof SvelteComponent;
};

// Stores category data for an accordion
export interface AccordionCategoryData {
    display: string;
    key: string;
    data: { [index: string]: AccordionItemData };
};
export interface AccordionItemData {};

// Raw data for accordion generation within constants.ts
export interface RawAccordionData {
    [categoryKey: string]: RawAccordionCategoryData;
};
export interface RawAccordionCategoryData {
    display: string;
    items:   RawAccordionItemData[];
};
export interface RawAccordionItemData {
    display: string;
    data:    string; // Assume SKU or something
};

// Accordion data once initialized
export interface AccordionData {
    [categoryKey: string]: AccordionCategoryData;
};
export interface AccordionCategoryData {
    display: string;
    items:   AccordionItemData[];
};
export interface AccordionItemData {
    display:   string;
    component: typeof SvelteComponent;
    props:     { [key: string]: any };
};

export interface MessageHandlers { 
    [key: string]: (...args: any) => Promise<any>;
}; // Content handlers for individual content scripts
export interface DomainMatches {
    [key: string]: string;
}; // Domain key to glob URL match

// For displaying changelog stuff within extension
export interface ChangelogVersion {
    display: string;
    bullets: string[];
}

// Global settings shared within extension
export interface Settings {
    [category: string]: SettingsCategory;
}
export interface SettingsCategory { 
    [key: string]: string | boolean | number;
};
export interface SettingLabels {
    [category: string]: SettingsCategoryLabel
}; // Don't store label Storage API
export interface SettingsCategoryLabel {
    display:      string;
    description?: string;
    settings:     { [key: string]: SettingLabelValue };
};
export interface SettingLabelValue {
    display: string;
    default: string | boolean | number;
    args?:   { [index: string]: any };
}

// Types for Best Buy background script
export interface BestBuyQueuesData { 
    [sku: string]: BestBuySKUQueuesData;
}; // Maps each product SKU to its set of queue data
export interface BestBuySKUQueuesData {
    [id: string]: ProductQueueData;
}; // Maps each queue ID to decoded data
export interface ProductQueueData {
    startTime:                 number; // Assume on response, in milliseconds
    a2cTransactionReferenceId: string;
    a2cTransactionCode:        string;
    queueTime:                 number; // In milliseconds
}; // Queue data for tracking individual product queues

// Types for Best Buy content script
// [startTime, a2cTransactionID, a2cTransactionCode, ???]
export interface BestBuyClientQueueData {
    [sku: string]: [number, string, string, boolean];
};

// Types for EVGA script
export interface EVGATokenMetadata {
    [name: string]: string;
}; // CSRF token and page metadata
export interface EVGAProductData {
    display:       string;
    shortened:     string; // Cut off after first comma
    productNumber: string;
    indexes:       [number, number]; // Category and product index
}; // Individual product data for given page
export interface EVGAFormTokens {
    [name: string]: string;
};

/*
// Stores session scraped info from EVGA products page
export interface EVGAScrapedData {
    last: number; // Timestamp of last scraped
    tokens: {
        formValues:           { [index: string]: string }; // Values from aspNetHidden form
        csrf:                 string; // "ctl00$LFrame$prdList$CsrfToken$CsrfToken" add-to-cart and notify
        __ncforminfo:         string; // "__ncforminfo" add-to-cart
        __VIEWSTATEGENERATOR: string; // "__VIEWSTATEGENERATOR" add-to-cart
        __EVENTVALIDATION:    string; // "__EVENTVALIDATION" add-to-cart
    }
}

// Stores somewhat static GPU information from EVGA products page
// EVGA Graphics: Order: Asc-Price
export interface EVGAGraphicsData {
    last:       number; // Timestamp of last scraped
    categories: EVGAGraphicsCategory[]; // Product categories
};
export interface EVGAGraphicsCategory {
    display:  string;
    index:    number; // Category = index, start = index + 1
    products: EVGAGraphicsProduct[]; // Individual products
}; // Data for individual categories within product page
export interface EVGAGraphicsProduct {
    display: string;
    pn:      string;
}; // Data for individual products within category
*/