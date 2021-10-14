import type { SvelteComponent } from "../../node_modules/svelte/types/runtime";

// Setter and getter functions?
export type Setter = (setKey: string, setValue: any) => void;
export type Deleter = (delKey: string) => void;

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
export interface MessageRequest {
    sender:  string;
    handler: string;
    args:    any[];
}; // Message request passed through Messages API
export interface DomainMatches {
    [key: string]: string;
}; // Domain key to glob URL match

export interface MessageResponse {
    status:  string; // success / not-found / error
    payload: any;    // result / undefined / error message
}; // Message response passed through Messages API

// Changelog stuff
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
export interface QueueData {
    [sku: string]: [number, string, string, boolean];
};

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