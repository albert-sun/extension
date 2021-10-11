<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { backgroundSelf, defaultSettings } from "../../shared/constants";
    import type { Settings, Setter } from "../../shared/types";
    import { initializeStore } from "../../shared/utilities";

    const self = backgroundSelf;

    // Declare stores initially to avoid errors
    let settings: Writable<Settings>; 
    let setSettings: Setter;

    // Does not include destructor, don't care
    onMount(async function() {
        // Initialize settings store and merge with default settings if some aren't defined
        ({ store: settings, set: setSettings } = await initializeStore<Settings>(self, "settings", defaultSettings));
        for(const [categoryKey, categoryData] of Object.entries(defaultSettings)) {
            // Check whether the given category exists
            const currentCategoryData = $settings[categoryKey];
            if($settings[categoryKey] !== undefined) {
                // Exists, merge settings that aren't defined
                let somethingChanged = false;
                for(const [settingKey, settingValue] of Object.entries(categoryData)) {
                    // Modify current category data if undefined or wrong type, then merge
                    // Currently doesn't remove obsolete settings but TODO
                    const currentSettingValue = currentCategoryData[settingKey];
                    if(currentSettingValue === undefined || typeof currentSettingValue !== typeof settingValue) {
                        currentCategoryData[settingKey] = settingValue;
                        somethingChanged = true;
                    }
                }

                // Invoke setter if something has changed
                if(somethingChanged === true) {
                    setSettings(categoryKey, currentCategoryData);
                }
            } else {
                // Doesn't exist, set with default settings
                setSettings(categoryKey, categoryData);
            }
        }
    });
</script>