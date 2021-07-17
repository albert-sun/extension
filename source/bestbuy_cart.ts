import { browser, Runtime } from "webextension-polyfill-ts";
import { elementColor, retrieveSettingsKV, sleep } from "./utilities";
import { defaultSettings } from "./constants";
import { SavedItem, Setting } from "./structure";

declare var __META_LAYER_META_DATA: any;

let categorySettings: { [index: string]: Setting } = {}; 
let updatedSettingHandlers: { [index: string]: Function } = {
    "notificationSoundURL": async function() { 
        notificationSound = new Audio(categorySettings["notificationSoundURL"].value);
    },
    "whitelistedKeywords": async function() {
        whitelistedKeywords = categorySettings["whitelistedKeywords"].value
            .split(",").map((keyword: string) => keyword.trim().toLowerCase())
            .filter((keyword: string) => keyword != "");
    }, 
    "blacklistedKeywords": async function() {
        blacklistedKeywords = categorySettings["blacklistedKeywords"].value
            .split(",").map((keyword: string) => keyword.trim().toLowerCase())
            .filter((keyword: string) => keyword != "");
    }
}; // Handlers for when settings are updated without requiring reload
let messageHandlers: { [index: string]: Function } = {
    "updatedSetting": async function(fullSettingsKey: string, value: any) {
        // Make sure the category is correct, update setting then call handler
        const [category, settingsKey] = fullSettingsKey.split("-");
        if(category === "bestbuy") {
            categorySettings[settingsKey].value = value;
            await updatedSettingHandlers[settingsKey]();
        }
    },
    "testNotificationSound": async function() { notificationSound.play(); }
}

let notificationSound: HTMLAudioElement;
let whitelistedKeywords: string[] = []; // Lowercase
let blacklistedKeywords: string[] = []; // Lowercase
let savedItems: SavedItem[] = [];
let previousCartLength = 0; // Cannot access DOM global variables, improvise
let lastClickedTime = 0; // Unix timestamp for last time button clicked

// Cart page saved items runtime - periodically polls elements for color and clickability
async function savedCartRuntime() {
    // Get initial previous cart length, wait for cart to load
    // Fixes issue with false "add to cart" notification before page loads
    while($(".page-heading__title").length === 0) {
        await sleep(categorySettings["globalPollingInterval"].value);
    }
    const initCartWrapper = $(".item-list")[0];
    previousCartLength = initCartWrapper !== undefined 
        ? initCartWrapper.childNodes.length : 0;

    // Keep loop running while page is loaded
    while(true) {
        // Wait until spinner not showing to continue interval
        while($(".page-spinner--in").length > 0) {
            await sleep(categorySettings["globalPollingInterval"].value);
        }

        // Compare current and previous cart contents for changes
        // Play notification sound if something added to cart
        const cartWrapper = $(".item-list")[0];
        const currentCartLength = cartWrapper !== undefined 
            ? cartWrapper.childNodes.length : 0;
        if(currentCartLength > previousCartLength) { 
            notificationSound.play();
        }

        // Ignore parsing if cart contains item and setting toggled
        previousCartLength = currentCartLength;
        if(currentCartLength > 0 && categorySettings["stopClickCartOccupied"].value === true) {
            await sleep(categorySettings["globalPollingInterval"].value);

            continue;
        }

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

        // Re-scrape saved items elements only when unloaded from DOM, but re-filter every interval
        const filteredSavedItems = savedItems.filter(
            savedItem => whitelistedKeywords.some( // Contains at least one whitelisted keyword
                keyword => keyword !== "" && savedItem.description.toLowerCase().includes(keyword)
        )).filter( // Contains no whitelisted keywords, edge case for empty blacklisted keywords
            savedItem => blacklistedKeywords.every(
                keyword => !savedItem.description.toLowerCase().includes(keyword)
        ));

        // Saved items still loaded or re-scraped, iterate over
        for(const savedItem of filteredSavedItems) {
            // Check whether button color is clickable (not grey)
            const buttonColor = elementColor(savedItem.addButton);
            if(["white", "blue", "yellow"].includes(buttonColor) === true) {
                // Click if auto-click is enabled in settings and timeout elapsed
                // Giving timeout between button clicks prevents rate-limits and such
                const sinceLastClick = Number(new Date()) - lastClickedTime;
                if(categorySettings["autoClickWhitelisted"].value === true 
                    && sinceLastClick > categorySettings["successiveClickTimeout"].value) {
                    savedItem.addButton.click();
                    lastClickedTime = Number(new Date());
                }
            }
        }

        await sleep(categorySettings["globalPollingInterval"].value);
    }
}

// Asynchronous main content script runtime
(async function() {
    // Retrieve updated settings from Storage API and initialize
    categorySettings = await retrieveSettingsKV("bestbuy");
    for(const [_, updatedSettingHandler] of Object.entries(updatedSettingHandlers)) {
        await updatedSettingHandler();
    }

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

    await savedCartRuntime(); // Actual runtime for cart stuff, perpetual?
}());