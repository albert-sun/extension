

// Specialized category data for EVGA
export interface EVGACategoryData extends AccordionCategoryData {
    meta: {
        productType: number;    // "ctl00$LFrame$prdList$lblProductType"
        family: string;         // "ctl00$LFrame$prdList$lblFamily"
        category?: string;      // "ctl00$LFrame$prdList$lblCategory"
        chipset?: string;       // "ctl00$LFrame$prdList$lblChipset"
        adv?: string;           // "ctl00$LFrame$prdList$lblAdv"
        order?: string;         // "ctl00$LFrame$prdList$lblOrder"
        onlyIn?: string;        // "ctl00$LFrame$prdList$lblOnlyIn"
    };
    data: { [index: string]: EVGAItemData };
};
export interface EVGAItemData extends AccordionItemData {
    pn: string;     // Product number
    id: string;     // Convoluted mess
};