import { AllSettings } from "./structure";

// Settings across all categories for extension
export const defaultSettings: AllSettings = {
    "bestbuy": [
        { key: "automaticQueueFix", description: "Attempt to automatically fix broken queues", type: "slideSwitch", value: true },
        { key: "autoClickWhitelisted", description: "Automatically click whitelisted ATC buttons", type: "slideSwitch", value: true },
        { key: "stopClickCartOccupied", description: "Stop automatic clicking when cart occupied", type: "slideSwitch", value: true },
        { key: "globalPollingInterval", description: "Global content script polling interval", type: "number", extraText: "ms", value: 100 },
        { key: "successiveClickTimeout", description: "Timeout between successive button clicks", type: "number", extraText: "ms", value: 2500 },
        { key: "notificationSoundURL", description: "Custom notification sound URL (mp3 hotlink)", type: "text", value: "https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true" },
        { key: "testNotificationSound", description: "Play current notification sound", type: "button", instruction: "testNotificationSound" },
    ]
};