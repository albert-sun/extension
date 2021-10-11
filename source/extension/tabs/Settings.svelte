<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import InputValue from "../components/InputValue.svelte";
    import { defaultSettings, extensionSelf, settingLabels } from "../../shared/constants";
    import type { Setter, Settings } from "../../shared/types";
    import { initializeStore } from "../../shared/utilities";

    const self = extensionSelf;

    // Declare stores initially to avoid errors
    let settings: Writable<Settings>;
    let setSettings: Setter;

    // Update chunk of settings whenever input value changed
    async function updateSettings(event: CustomEvent<any>, categoryKey: string, settingKey: string) {
        // Retrieve value from element, update and broadcast
        const newValue = event.detail; // Spoof for input value
        const categorySettings = $settings[categoryKey]; 
        categorySettings[settingKey] = newValue;
        setSettings(categoryKey, categorySettings);
    }

    // Does not include destructor, don't care
    onMount(async function() {
        // Initialize settings store and custom logic for broadcasting updates
        ({store: settings, set: setSettings } = await initializeStore<Settings>(self, "settings", defaultSettings));
    });
</script>

<div class="flex-column column-spacing-small content">
    {#each Object.entries($settings || {}) as [categoryKey, categoryData]}
        <p class="header">{settingLabels[categoryKey].display}</p>
        {#if settingLabels[categoryKey].description !== undefined}
            <p>{settingLabels[categoryKey].description}</p>
        {/if}
        <table class="settings-wrapper">
            {#each Object.entries(categoryData) as [settingKey, settingData]}
                <!-- Don't bind value, only as initial input -->
                <InputValue display={settingLabels[categoryKey].settings[settingKey].display}
                    value={settingData}
                    args={settingLabels[categoryKey].settings[settingKey].args || {}}
                    on:update={event => { updateSettings(event, categoryKey, settingKey) }}/>
            {/each}
        </table>
        <br>
    {/each}
</div>

<style lang="scss">
    table.settings-wrapper {
        padding: 0em 0.5em 0em 0.5em;
        table-layout: fixed;
        border-spacing: 0px 0.25em;
        border: 2px solid var(--color-darkestgrey);
        background-color: var(--color-lightestgrey);
    }
</style>