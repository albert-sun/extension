import { AllSettings, Changelog } from "./structure";

// Changelog from previous versions
export const changelogs: Changelog[] = [
    {
        "version": "b0.2.1",
        "bulletpoints": [
            `Fixed empty blacklist disqualifying all saved items`,
            `Replaced icon which said "AQU" instead of "AGU" (original extension name was AutoQueueUtilities)`,
            `<b>TODO:</b> Fix notification sound not playing if user hasn't interacted with document, maybe play from background instead?`
        ]
    }, {
        "version": "b0.2.0",
        "bulletpoints": [
            `Added About tab showing some information and usage instructions`,
            `Changed extension icon to something somewhat more presentable`,
            `Removed placeholder logging tab pending further development`,
            `Added blacklisted keywords functionality to script (still no test buttons)`,
            `Other minor edits to extension popup styling, nothing too major`,
        ]
    }, {
        "version": "b0.1.0",
        "bulletpoints": [
            `Added changelog (this tab here) and placeholder logging tab for testing`,
            `Changed extension script loading to work somewhat more dynamically`,
        ]
    }, {
        "version": "b0.0.1",
        "bulletpoints": [
            `Ported most functionality from Tampermonkey script located <a href="https://github.com/albert-sun/tamper-scripts/">here</a>`,
            `<b>Features not yet implemented</b>: blacklisted keywords and buttons for testing wtihin settings (removed until settings structure finalized)`,
            `<b>Improvements from Tampermonkey script</b>: Instant settings propogation and no refresh required for cart addition or removal`
        ]
    }
]

// Settings across all categories for extension
export const defaultSettings: AllSettings = {
    "bestbuy": [
        { key: "automaticQueueFix", description: "Attempt to automatically fix broken queues", type: "slideSwitch", value: true },
        { key: "autoClickWhitelisted", description: "Automatically click whitelisted ATC buttons", type: "slideSwitch", value: true },
        { key: "stopClickCartOccupied", description: "Stop automatic clicking when cart occupied", type: "slideSwitch", value: true },
        { key: "globalPollingInterval", description: "Global content script polling interval", type: "number", extraText: "ms", value: 100 },
        { key: "successiveClickTimeout", description: "Timeout between clicking unique buttons", type: "number", extraText: "ms", value: 2500 },
        { key: "notificationSoundURL", description: "Notification sound URL (mp3 hotlink)", type: "text", value: "https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true" },
        { key: "whitelistedKeywords", description: "Whitelisted keywords (comma-separated)", type: "text", value: "3060,3060ti,3060 ti,3070,3070ti,3070 ti,3080,3080ti,3080 ti,3090"},
        { key: "blacklistedKeywords", description: "Blacklisted keywords (comma-separated)", type: "text", value: ""},
        // { key: "testNotificationSound", description: "Play current notification sound", type: "button", instruction: "testNotificationSound" },
    ]
};