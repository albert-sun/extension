import { writable } from "../../node_modules/svelte/store";
import type { RawAccordionData, SettingLabels, Settings } from "./types";

// Declare shared stores, NOTE that they can only be shared within the same context!
export const tabURLs = writable([] as string[]); // tab URLs shared between components

// Aggregate self-identification keys
export const backgroundSelf = "background";
export const extensionSelf = "extension";

// Settings including default for initialization and labels
export const defaultSettings: Settings = {
    "global": {
        "forceTab": false,
        "pollingInterval": 5000,
    }
}
export const settingLabels: SettingLabels = {
    "global": {
        display: "Global Settings",
        settings: {
            "forceTab": { 
                display: "Automatically open content script tabs",
            },
            "pollingInterval": { 
                display: "Polling interval for background script and extension",
                args: { "suffix": "ms" }
            },
        }
    }
}

// Best Buy data for manual add-to-cart and display
export const rawBestBuyItems: RawAccordionData = {
    "gtx-16": {
        display: "[Graphics] GeForce GTX 16-Series",
        items: [
            { display: "ASUS GeForce GTX 1660 SUPER TUF GAMING OC", "data": "6405063" },
            { display: "EVGA GeForce GTX 1650 SUPER SUPER SC ULTRA GAMING", "data": "6412939" },
            { display: "EVGA GeForce GTX 1660Ti SC ULTRA GAMING", "data": "6373500" },
            { display: "MSI GeForce GTX 1650 SUPER GAMING X", "data": "6397798" },
            { display: "MSI GeForce GTX 1660 SUPER GAMING X", "data": "6389333" },
            { display: "MSI GeForce GTX 1660Ti GAMING X", "data": "6330461" },
            { display: "PNY GeForce GTX 1650 SUPER XLR8 GAMING OC", "data": "6407305" },
            { display: "PNY GeForce GTX 1660 SUPER XLR8 GAMING OC", "data": "6407309" },
        ],
    },
    "rtx-3060": {
        display: "[Graphics] GeForce RTX 3060",
        items: [
            { display: "ASUS GeForce RTX 3060 STRIX", "data": "6460665" },
            { display: "ASUS GeForce RTX 3060 STRIX (LHR)", "data": "6475224" },
            { display: "ASUS GeForce RTX 3060 TUF GAMING", "data": "6460666" },
            { display: "ASUS GeForce RTX 3060 TUF GAMING (LHR)", "data": "6475223" },
            { display: "EVGA GeForce RTX 3060 XC GAMING (KB)", "data": "6454329" },
            { display: "EVGA GeForce RTX 3060 XC GAMING (KR)", "data": "6454328" },
            { display: "GIGABYTE GeForce RTX 3060 AORUS ELITE", "data": "6468910" },
            { display: "GIGABYTE GeForce RTX 3060 EAGLE OC", "data": "6454689" },
            { display: "GIGABYTE GeForce RTX 3060 EAGLE OC (LHR)", "data": "6468928" },
            { display: "GIGABYTE GeForce RTX 3060 GAMING OC", "data": "6454688" },
            { display: "GIGABYTE GeForce RTX 3060 GAMING OC (LHR)", "data": "6468931" },
            { display: "GIGABYTE GeForce RTX 3060 VISION OC", "data": "6468925" },
            { display: "MSI GeForce RTX 3060 GAMING X OC", "data": "6476229" },
            { display: "MSI GeForce RTX 3060 VENTUS 2X OC", "data": "6462173" },
            { display: "MSI GeForce RTX 3060 VENTUS 3X OC", "data": "6452940" },
            { display: "PNY GeForce RTX 3060 XLR8 GAMING REVEL EPIC-X", "data": "6454318" },            
        ],
    },
    "rtx-3060ti": {
        display: "[Graphics] GeForce RTX 3060Ti",
        items: [
            { display: "ASUS GeForce RTX 3060Ti TUF GAMING", "data": "6475237" },
            { display: "ASUS GeForce RTX 3060Ti TUF GAMING", "data": "6452573" },
            { display: "EVGA GeForce RTX 3060Ti FTW3 GAMING (KB)", "data": "6444444" },
            { display: "EVGA GeForce RTX 3060Ti FTW3 GAMING (KH, LHR)", "data": "6479524" },
            { display: "GIGABYTE GeForce RTX 3060Ti AORUS EAGLE (LHR)", "data": "6479686" },
            { display: "GIGABYTE GeForce RTX 3060Ti EAGLE OC", "data": "6442485" },
            { display: "GIGABYTE GeForce RTX 3060Ti EAGLE OC (LHR)", "data": "6471951" },
            { display: "GIGABYTE GeForce RTX 3060Ti GAMING OC", "data": "6471952" },
            { display: "GIGABYTE GeForce RTX 3060Ti GAMING OC (LHR)", "data": "6479688" },
            { display: "GIGABYTE GeForce RTX 3060Ti GAMING OC (LHR V2)", "data": "6442484" },
            { display: "MSI GeForce RTX 3060Ti GAMING X", "data": "6480291" },
            { display: "MSI GeForce RTX 3060Ti GAMING Z", "data": "6476230" },
            { display: "MSI GeForce RTX 3060Ti VENTUS 2X OC", "data": "6441172" },
            { display: "MSI GeForce RTX 3060Ti VENTUS 2X OC (LHR)", "data": "6471286" },
            { display: "MSI GeForce RTX 3060Ti VENTUS 3X OC", "data": "6480307" },
            { display: "NVIDIA GeForce RTX 3060Ti FOUNDERS", "data": "6439402" },
        ],
    },
    "rtx-3070": {
        display: "[Graphics] GeForce RTX 3070",
        items: [
            { display: "ASUS GeForce RTX 3070 STRIX", "data": "6439127" },
            { display: "ASUS GeForce RTX 3070 STRIX (LHR)", "data": "6475228" },
            { display: "ASUS GeForce RTX 3070 TUF GAMING", "data": "6439128" },
            { display: "ASUS GeForce RTX 3070 TUF GAMING (LHR)", "data": "6475226" },
            { display: "EVGA GeForce RTX 3070 XC3 ULTRA GAMING (KL, LHR)", "data": "6479528" },
            { display: "EVGA GeForce RTX 3070 XC3 ULTRA GAMING (KH, LHR)", "data": "6477077" },
            { display: "EVGA GeForce RTX 3070 XC3 ULTRA GAMING (KB)", "data": "6439299" },
            { display: "GIGABYTE GeForce RTX 3070 AORUS MASTER", "data": "6439384" },
            { display: "GIGABYTE GeForce RTX 3070 AORUS MASTER (LHR)", "data": "6479685" },
            { display: "GIGABYTE GeForce RTX 3070 EAGLE", "data": "6437912" },
            { display: "GIGABYTE GeForce RTX 3070 EAGLE OC (LHR)", "data": "6471958" },
            { display: "GIGABYTE GeForce RTX 3070 GAMING OC", "data": "6437909" },
            { display: "GIGABYTE GeForce RTX 3070 VISION OC", "data": "6439385" },
            { display: "MSI GeForce RTX 3070 GAMING Z TRIO", "data": "6471285" },
            { display: "MSI GeForce RTX 3070 VENTUS 2X OC", "data": "6462266" },
            { display: "MSI GeForce RTX 3070 VENTUS 2X OC (LHR)", "data": "6480308" },
            { display: "MSI GeForce RTX 3070 VENTUS 3X OC", "data": "6438278" },
            { display: "MSI GeForce RTX 3070 GAMING X TRIO", "data": "6438279" },
            { display: "NVIDIA GeForce RTX 3070 FOUNDERS", "data": "6429442" },
        ],
    },
    "rtx-3070ti": {
        display: "[Graphics] GeForce RTX 3070Ti",
        items: [
            { display: "ASUS GeForce RTX 3070Ti STRIX", "data": "6467838" },
            { display: "ASUS GeForce RTX 3070Ti TUF GAMING", "data": "6467840" },
            { display: "GIGABYTE GeForce RTX 3070Ti AORUS MASTER", "data": "6467788" },
            { display: "GIGABYTE GeForce RTX 3070Ti GAMING OC", "data": "6467779" },
            { display: "GIGABYTE GeForce RTX 3070Ti EAGLE", "data": "6467782" },
            { display: "GIGABYTE GeForce RTX 3070Ti EAGLE OC", "data": "6467781" },
            { display: "GIGABYTE GeForce RTX 3070Ti VISION OC", "data": "6467785" },
            { display: "MSI GeForce RTX 3070Ti GAMING X TRIO", "data": "6467497" },
            { display: "MSI GeForce RTX 3070Ti VENTUS 3X OC", "data": "6467500" },
            { display: "NVIDIA GeForce RTX 3070Ti FOUNDERS", "data": "6465789" },
        ],
    },
    "rtx-3080": {
        display: "[Graphics] GeForce RTX 3080",
        items: [
            { display: "ASUS GeForce RTX 3080 STRIX", "data": "6432445" },
            { display: "ASUS GeForce RTX 3080 STRIX (LHR)", "data": "6475238" },
            { display: "EVGA GeForce RTX 3080 XC3 ULTRA GAMING (KB)", "data": "6432400" },
            { display: "EVGA GeForce RTX 3080 XC3 ULTRA GAMING (KH, LHR)", "data": "6471615" },
            { display: "GIGABYTE GeForce RTX 3080 AORUS MASTER (LHR)", "data": "6462198" },
            { display: "GIGABYTE GeForce RTX 3080 AORUS XTREME", "data": "6436223" },
            { display: "GIGABYTE GeForce RTX 3080 AORUS XTREME (LHR)", "data": "6471954" },
            { display: "GIGABYTE GeForce RTX 3080 EAGLE OC", "data": "6430621" },
            { display: "GIGABYTE GeForce RTX 3080 GAMING OC", "data": "6430620" },
            { display: "GIGABYTE GeForce RTX 3080 GAMING OC (LHR)", "data": "6471960" },
            { display: "GIGABYTE GeForce RTX 3080 VISION OC", "data": "6436219" },
            { display: "GIGABYTE GeForce RTX 3080 VISION OC (LHR)", "data": "6471957" },
            { display: "MSI GeForce RTX 3080 GAMING Z TRIO", "data": "6480289" },
            { display: "MSI GeForce RTX 3080 VENTUS 3X (LHR)", "data": "6471287" },
            { display: "MSI GeForce RTX 3080 VENTUS 3X OC", "data": "6430175" },
            { display: "MSI GeForce RTX 3080 VENTUS 3X PLUS (LHR)", "data": "6480306" },
            { display: "NVIDIA GeForce RTX 3080 FOUNDERS", "data": "6429440" },
        ],
    },
    "rtx-3080ti": {
        display: "[Graphics] GeForce RTX 3080Ti",
        items: [
            { display: "ASUS GeForce RTX 3080Ti STRIX", "data": "6466931" },
            { display: "ASUS GeForce RTX 3080Ti TUF GAMING", "data": "6466932" },
            { display: "EVGA GeForce RTX 3080Ti FTW3 ULTRA GAMING (KB)", "data": "6467808" },
            { display: "GIGABYTE GeForce RTX 3080Ti AORUS MASTER", "data": "6468932" },
            { display: "GIGABYTE GeForce RTX 3080Ti AORUS XTREME", "data": "6468933" },
            { display: "GIGABYTE GeForce RTX 3080Ti GAMING OC", "data": "6466561" },
            { display: "GIGABYTE GeForce RTX 3080Ti VISION OC", "data": "6466564" },
            { display: "MSI GeForce RTX 3080Ti GAMING X TRIO", "data": "6465803" },
            { display: "MSI GeForce RTX 3080Ti VENTUS 3X OC", "data": "6472637" },
            { display: "NVIDIA GeForce RTX 3080Ti FOUNDERS", "data": "6462956" },
            { display: "PNY GeForce RTX 3080Ti XLR8 GAMING REVEL EPIC-X", "data": "6467289" },
        ],
    },
    "rtx-3090": {
        display: "[Graphics] GeForce RTX 3090",
        items: [
            { display: "ASUS GeForce RTX 3090 STRIX", "data": "6432447" },
            { display: "ASUS GeForce RTX 3090 TUF GAMING", "data": "6432446" },
            { display: "EVGA GeForce RTX 3090 XC3 ULTRA GAMING (KB)", "data": "6434198" },
            { display: "GIGABYTE GeForce RTX 3090 AORUS MASTER", "data": "6437910" },
            { display: "GIGABYTE GeForce RTX 3090 EAGLE OC", "data": "6430624" },
            { display: "GIGABYTE GeForce RTX 3090 GAMING OC", "data": "6430623" },
            { display: "GIGABYTE GeForce RTX 3090 VISION OC", "data": "6445108" },
            { display: "MSI GeForce RTX 3090 GAMING X TRIO", "data": "6468863" },
            { display: "MSI GeForce RTX 3090 VENTUS 3X OC", "data": "SKU: 6472646" },
            { display: "MSI GeForce RTX 3090 VENTUS 3X OC (?)", "data": "6430215" },
            { display: "NVIDIA GeForce RTX 3090 FOUNDERS", "data": "6429434" },
        ],
    },
};
export const bestBuyDisplays: { [sku: string]: string } = Object.entries(rawBestBuyItems).reduce((obj, [rawCategoryKey, rawCategoryData]) => {
    obj = {
        ...obj, 
        ...Object.entries(rawCategoryData).reduce((subObj, [rawItemKey, rawItemData]) => {
            subObj[rawItemKey] = rawItemData.display;
    
            return subObj;
        }, {} as { [sku: string]: string }),
    };
    
    return obj;
}, {} as { [sku: string]: string });