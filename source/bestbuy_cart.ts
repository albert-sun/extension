import { browser, Runtime } from "webextension-polyfill-ts";
import { retrieveSettingsKV, sleep } from "./utilities";
import { defaultSettings } from "./constants";
import { SavedItem, Setting } from "./structure";

let categorySettings: { [index: string]: any } = {}; 
let updatedSettingHandlers: { [index: string]: Function } = {
    "notificationSoundURL": async function() { 
        notificationSound = new Audio(categorySettings["notificationSoundURL"].value);
    }
}; // Handlers for when settings are updated without requiring reload
let messageHandlers: { [index: string]: Function } = {
    "updatedSetting": async function(fullSettingsKey: string, value: any) {
        // Make sure the category is correct, update setting then call handler
        const [category, settingsKey] = fullSettingsKey.split("-");
        if(category === "bestbuy") {
            categorySettings[settingsKey] = value;
            await updatedSettingHandlers[settingsKey]();
        }
    },
    "testNotificationSound": async function() { notificationSound.play(); }
}

let notificationSound: HTMLAudioElement;
let savedItems: SavedItem[] = [];

// Cart page saved items runtime - periodically polls elements for color and clickability
async function savedCartRuntime() {
    // Keep loop running while page is loaded
    while(true) {
        // Check whether saved item buttons still exist in DOM
        const stillExists = savedItems.some(itemData => $.contains(document.body, itemData.wrapper));
        if(stillExists === false) { // Saved items probably reload, re-scrape
            let savedElements = $(".saved-items__card-wrapper").toArray();
            while(savedElements.length === 0) { // Wait until saved items elements exist
                await sleep(categorySettings["globalPollingInterval"].value);
                savedElements = $(".saved-items__card-wrapper").toArray();
            }

            // Disgusting way to map elements, can't arrow map to interface apparently
            savedItems = savedElements.map(function(element) { return {
                wrapper: element,
                sku: element.getAttribute("data-test-saved-sku") as string,
                description: $(element).find(".simple-item__description")[0].innerText,
                addButton: $(element).find(".btn")[0],
            } as SavedItem});
        }

        // Saved items still loaded or re-scraped, iterate over
    }
}

// Asynchronous main content script runtime
(async function() {
    // Retrieve updated settings from Storage API and initialize
    categorySettings = await retrieveSettingsKV("bestbuy");
    await updatedSettingHandlers["notificationSoundURL"]();

    // Setup message listener mainly for updated settings
    browser.runtime.onMessage.addListener(async function(message: any, sender: Runtime.MessageSender): Promise<any> {
        // Process handler with provided arguments and respond if necessary
        const handler = messageHandlers[message.instruction];
        if(handler !== undefined) { // Check whether given handler exists
            const result = await handler(...message.arguments || []);
            return result; // Equivalent to sendResponse?
        }
    });

    // Store current queue data along with timestamp
    const queueInfo = {
        data: atob(localStorage.getItem("purchaseTracker") || "e30="),
        time: Number(new Date()), 
    }; // "Last updated" timestamp for extension
    await browser.storage.local.set({ "bestbuy-queueInfo": queueInfo });
    browser.runtime.sendMessage({ "instruction": "updatedQueueInfo", "arguments": [queueInfo] });

    await savedCartRuntime(); // Actual runtime for cart stuff
}());