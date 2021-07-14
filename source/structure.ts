// Settings maintained in storage and passed between background, extension, and content scripts
export interface AllSettings { [index: string]: Setting[] };
export interface Setting {
    key: string,
    description: string,
    type: string,
    value?: any, // Default value of setting?
    extraText?: string, // For input
    instruction?: string, // For button
};

export interface Message {
    instruction: string,
    arguments: any[],
}

export interface SavedItem {
    wrapper: HTMLElement,
    description: string,
    addButton: HTMLButtonElement,
    sku: string,
}