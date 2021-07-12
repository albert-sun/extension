import { browser, Tabs } from "webextension-polyfill-ts";
import { Message } from "./source/structure"

// Asynchronous message handlers for performing various functions
// Performs Chrome API calls and middlemans communication between content script and extension popup
const messageHandlers: { [index: string]: Function } = {
    "forwardMessage": async function(query: Tabs.QueryQueryInfoType, message: Message) {
        const tabs = await browser.tabs.query(query);
        return Promise.all(tabs.map(async function(tab: Tabs.Tab): Promise<any> {
            return await browser.tabs.sendMessage(tab.id as number, message);
        }));
    }, // Forward message to one or more tabs in parallel and wait for a response
};