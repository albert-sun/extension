import { AllSettings } from "./structure";

const queueDataKey = "bestbuy-queueData";
const settingsKey = "settings"; // All settings

const defaultQueueData = {}; 
const defaultSettings: AllSettings = {
    "bestBuy": [
        { key: "maximumAddAttempts", description: "Maximum add-to-cart attempts per button", type: "number", value: 0 },
        { key: "contentPollingInterval", description: "Content script polling interval", type: "number", extraText: "ms", value: 100 },
        { key: "buttonClickTimeout", description: "Timeout between successive button clicks", type: "number", extraText: "ms", value: 2500 },
        { key: "autoRefreshInterval", description: "Cart / Product page auto-refresh interval", type: "number", extraText: "ms", value: 60000 },
        { key: "notificationSoundURL", description: "Notification sound URL (mp3)", type: "text", value: "https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true" },
        { key: "testNotificationSound", description: "Test current notification sound", type: "button", instruction: "testNotificationSound" },
    ]
};