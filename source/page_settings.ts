import { browser } from "webextension-polyfill-ts";
import { defaultSettings } from "./constants";
import { AllSettings, Setting } from "./structure";

// Asynchronously updates extension storage with given setting and notify tabs of update
// Issue with notifying to pages not reloaded when updating extension source?
async function updateSetting(settingKey: string, settingValue: any, notify = false) {
    await browser.storage.local.set({ [`setting-${settingKey}`]: settingValue });
    if(notify === true) { // Enabled by default for convenience
        const tabs = await browser.tabs.query({});
        const message = { "instruction": "updatedSetting", "arguments": [`${settingKey}`, settingValue] };
        for(const tab of tabs) { // Notify individual tabs of updated setting
            browser.tabs.sendMessage(tab.id as number, message);
        }
    }
}

// From settings buttons, broadcast given instruction to tabs
async function broadcastInstruction(instruction: string, args = []) {
    const tabs = await browser.tabs.query({});
    const message = { "instruction": instruction, "arguments": args };
    for(const tab of tabs) {
        // Wait for response and return with tabs?
        browser.tabs.sendMessage(tab.id as number, message);
    }
}

// Asynchronously retrieve all extension settings from Storage API
// Alright to modify because scoped only within extension popup...?
export async function getAllSettings(): Promise<AllSettings> {
    const currentSettings = defaultSettings; // Can I modify defaultSettings?

    // Iterate through all categories and individual settings
    for(const [settingsCategory, settings] of Object.entries(currentSettings)) {
        for(const setting of settings) {
            // Ignore settings that aren't actually settings (buttons, etc.)
            if(setting.value === undefined) {
                continue;
            }

            // Replace with value from storage if modified exists, otherwise keep default
            const settingKey = `${settingsCategory}-${setting.key}`;
            const storageResult = await browser.storage.local.get(`setting-${settingKey}`);
            if(storageResult[`setting-${settingKey}`] !== undefined) { 
                setting.value = storageResult[`setting-${settingKey}`];
            }
        }
    }

    return currentSettings;
}

// Retrieve existing settings from storage and populate settings table for category
async function populateSettings() {
    // Cache existing settings from storage 
    const currentSettings = await getAllSettings();

    // Populate all settings categories tables within settings page
    for(const [settingsCategory, _] of Object.entries(defaultSettings)) {
        // Create the fancy table rows and stuff, has to be a cleaner way?
        const settingsTable = $(`#settings-${settingsCategory}`)[0];
        for(const setting of currentSettings[settingsCategory]) {
            // Initialize relevant elements for settings
            const settingRow = document.createElement("tr");
            settingRow.classList.add("table-row");
            settingsTable.appendChild(settingRow);
            const leftDescription = document.createElement("td");
            leftDescription.classList.add("table-element-left");
            settingRow.appendChild(leftDescription);
            const rightDescription = document.createElement("td");
            rightDescription.classList.add("table-element-right");
            settingRow.appendChild(rightDescription);

            // Parse description and information from setting
            // Also attach onclick / onchange callbacks to change settings
            leftDescription.innerText = setting.description;
            const settingKey = `${settingsCategory}-${setting.key}`;
            let settingRight: HTMLAnchorElement | HTMLButtonElement | HTMLInputElement | HTMLLabelElement; 
            if(setting.type === "button") {
                // Button usually for testing, broadcasts specific instruction (empty arguments)
                settingRight = document.createElement("a");
                settingRight.classList.add("table-button");
                settingRight.href = "#";
                settingRight.innerText = "Click me!";
                settingRight.onclick = function() {
                    broadcastInstruction(setting.instruction as string)
                };
            } else if(setting.type === "checkbox") {
                // Checkbox, acts much like regular input w/ different attributes
                settingRight = document.createElement("label");
                settingRight.classList.add("switch");
                const underCheck = document.createElement("input");
                settingRight.appendChild(underCheck);
                underCheck.type = "checkbox";
                underCheck.checked = setting.value;
                $(underCheck).change(function() {
                    updateSetting(settingKey, (underCheck as HTMLInputElement).checked);
                });
                const underSpan = document.createElement("span");
                underSpan.classList.add("slider");
                underSpan.classList.add("round");
                settingRight.appendChild(underSpan);
            } else { // text / number / etc.
                // Regular input, assume values are parsed properly
                settingRight = document.createElement("input");
                settingRight.classList.add("table-input");
                settingRight.type = setting.type;
                settingRight.value = setting.value;
                $(settingRight).change(function() {
                    updateSetting(settingKey, (settingRight as HTMLInputElement).value);
                });
            }
            rightDescription.appendChild(settingRight);

            // Append extra text to input (text, number, etc.) using a paragraph element
            if((setting.type !== "button" && setting.type !== "checkbox") && setting.extraText) {
                const extraText = document.createElement("p");
                extraText.classList.add("table-extra");
                extraText.textContent = setting.extraText;
                rightDescription.appendChild(extraText);
            } 
        }
    }
}

populateSettings();