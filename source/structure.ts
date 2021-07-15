// Settings maintained in storage and passed between background, extension, and content scripts
export interface AllSettings { [index: string]: Setting[] };
export interface Setting {
    key: string,
    description: string,
    type: string,
    value: any, // Default value of setting?
    extraText?: string, // Extra text after input field
};

// Whatever passed through messages
export interface Message {
    instruction: string,
    arguments: any[],
}

// Saved item for Best Buy cart page
export interface SavedItem {
    wrapper: HTMLElement,
    description: string,
    addButton: HTMLButtonElement,
    sku: string,
}