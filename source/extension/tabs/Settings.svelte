<script lang="ts">
    import { get } from "svelte/store";
    import InputValue from "../components/InputValue.svelte";
    import { extensionSelf, settingsDisplays } from "../../shared/constants";
    import { settings } from "../../shared/initializations";
    import { extensionLog } from "../../shared/utilities";

    const self = extensionSelf;

    // Update chunk of settings whenever input value changed
    async function updateSettings(event: CustomEvent<any>, categoryKey: string, settingKey: string) {
        // Retrieve value from element, update and broadcast
        const newValue = event.detail; // Spoof for input value

        extensionLog(self, `Updating setting [${categoryKey}][${settingKey}] to ${newValue}`);

        const categorySettings = get(settings.store)[categoryKey]; 
        categorySettings[settingKey] = newValue;
        settings.set(categoryKey, categorySettings);
    }
</script>

<div class="flex-column column-spacing-small content">
    <!-- Only render when initialized for initial value -->
    {#if get(settings.store) !== undefined}
        <!-- Iterate over labels instead of settings to preserve order -->
        {#each Object.entries(settingsDisplays) as [labelCategoryKey, labelCategoryData]}
            <p class="header">{labelCategoryData.display}</p>
            {#if labelCategoryData.description !== undefined}
                <p>{labelCategoryData.description}</p>
            {/if}
            <table class="settings-wrapper">
                {#each Object.entries(labelCategoryData.settings) as [labelSettingKey, labelSettingData]}
                    <!-- Don't bind, only care about initial setting value
                    Convoluted mess of || because of {} initial render -->
                    <InputValue display={labelSettingData.display}
                        initialValue={
                            get(settings.store)[labelCategoryKey] && get(settings.store)[labelCategoryKey][labelSettingKey] !== undefined
                            ? get(settings.store)[labelCategoryKey][labelSettingKey] : labelSettingData.default
                        }
                        args={labelSettingData.args || {}}
                        on:update={event => { updateSettings(event, labelCategoryKey, labelSettingKey) }}/>
                {/each}
            </table>
            <br>
        {/each}
    {/if}
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