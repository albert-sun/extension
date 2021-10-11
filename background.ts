/*import { browser, Runtime, Tabs } from "webextension-polyfill/dist/browser-polyfill.min.js";
import { defaultSettings } from "./source/constants";
import { Message, Setting } from "./source/structure";

console.log("registered!");

// Asynchronous message handlers for performing various functions
// Performs Chrome API calls and middlemans communication between content script and extension popup
const messageHandlers: { [index: string]: Function } = {
    "getSettings": async function(settingsCategory: string): Promise<{ [index: string]: Setting }> {
        // Get default or modified settings and put into settings
        const categorySettings: { [index: string]: Setting } = {};
        for(const setting of defaultSettings[settingsCategory]) { // Update with value from Storage API
            if(setting.value === undefined) {
                continue;
            }

            // Replace with value from storage if modified exists, otherwise keep default
            const settingKey = `${settingsCategory}-${setting.key}`;
            const storageResult = await browser.storage.local.get(`setting-${settingKey}`);
            categorySettings[setting.key] = storageResult[`setting-${settingKey}`] !== undefined
                ? storageResult[`setting-${settingKey}`] : setting.value;
        }

        return categorySettings;
    },
    "forwardMessage": async function(query: Tabs.QueryQueryInfoType, message: Message) {
        const tabs = await browser.tabs.query(query);
        return Promise.all(tabs.map(async function(tab: Tabs.Tab): Promise<any> {
            return await browser.tabs.sendMessage(tab.id as number, message);
        }));
    }, // Forward message to one or more tabs in parallel and wait for a response
};

// Don't worry about onInstalled setting initial storage vlaues, defaults handled during retrieval
// Register message listener and handlers for communicating between content script and extension
browser.runtime.onMessage.addListener(async function(message: any, sender: Runtime.MessageSender) {
    // Process handler with given arguments and respond
    const handler = messageHandlers[message.instruction];
    if(handler !== undefined) { // Ensure handler exists first
        const result = await handler(...handler.arguments || []);
        return result; // Have to check if undefined or not?
    }
});*/