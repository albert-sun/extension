import { browser } from "webextension-polyfill-ts";
import { defaultSettings } from "./constants";
import { Setting } from "./structure";

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// Possibly has issues resolving on Firefox? StackOverflow sure doesn't think so...
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

// Approximates the rendered background color of a given element to a given set of colors.
// Checks whether the "distance" from the element color is transparent or closest to either yellow/white/blue.
const colors = [
    {color: "yellow", r: 255, g: 224, b: 0},
    {color: "blue", r: 0, g: 30, b: 115},
    {color: "grey", r: 197, g: 203, b: 213},
    {color: "white", r: 255, g: 255, b: 255},
];
export function elementColor(element: HTMLElement) {
    // Get the rendered background color of the element
    const colorText = getComputedStyle(element, null).getPropertyValue("background-color");
    if(colorText.includes("rgb(0, 0, 0")) { // element has no color = transparent
        return "transparent";
    }

    // Parse RGB value and use fancy maths to find closest color
    const parsedColor = { r: 0, g: 0, b: 0 };
    const matchedColor = colorText.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i) as RegExpMatchArray;
    parsedColor.r = Number(matchedColor[1]); parsedColor.g = Number(matchedColor[2]); parsedColor.b = Number(matchedColor[3]);
    const closest = {color: "", distance: 442}; // Default distance just slightly larger than max
    for(const checkColor of colors) {
        const distance = Math.sqrt((parsedColor.r - checkColor.r) ** 2 + (parsedColor.g - checkColor.g) ** 2 + (parsedColor.b - checkColor.b));
        if(distance < closest.distance) {
            closest.color = checkColor.color;
            closest.distance = distance;
        }
    }

    return closest.color;
}

// Wrapper for retrieving from storage with default value if undefined
export async function storageGet(storageKey: string, defaultValue: any) {
    const storageResult = await browser.storage.local.get(storageKey);
    return storageResult[storageKey] !== undefined
        ? storageResult[storageKey] : defaultValue;
}

// Wrapper for retrieving settings for given category by updating from Storage API
export async function retrieveSettings(settingsCategory: string): Promise<Setting[]> {
    // Get default settings, then update individual settings from Storage API
    const categorySettings = defaultSettings[settingsCategory];
    for(const setting of categorySettings) {
        // Ignore settings without a value (buttons mainly)
        if(setting.value === undefined) {
            continue;
        }

        // Replace with value from storage if modified exists, otherwise keep default
        const settingKey = `setting-${settingsCategory}-${setting.key}`;
        setting.value = await storageGet(settingKey, setting.value);
    }

    return categorySettings;
}

// Wrapper for formatting the settings into key-value instead of array
export async function retrieveSettingsKV(settingsCategory: string): Promise<{ [index: string]: Setting }> {
    const categorySettingsKV: { [index: string]: Setting } = {};
    const categorySettings = await retrieveSettings(settingsCategory); // Get settings before reformatting
    for(const setting of categorySettings) {
        // Ignore settings without a value (buttons mainly)
        if(setting.value === undefined) {
            continue;
        }

        categorySettingsKV[setting.key] = setting;
    }
    
    return categorySettingsKV;
}