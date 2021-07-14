import { AllSettings } from "./structure";

// Settings across all categories for extension
export const defaultSettings: AllSettings = {
    "bestbuy": [
        { key: "changeResetReload", description: "Reset auto-reload on change without refresh", type: "checkbox", value: true },
        { key: "notificationSoundURL", description: "Notification sound URL (mp3)", type: "text", value: "https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true" },
        { key: "testNotificationSound", description: "Test current notification sound", type: "button", instruction: "testNotificationSound" },
    ]
};