<script lang="ts">
    import { onMount } from "svelte";
    import { tabURLs } from "../../shared/constants";

    // Maintain URLs for currently opened tabs and update when needed
    let tabMappings: { [tabId: number]: string | undefined } = {};
    $: {
        (tabMappings);
        $tabURLs = Object.values(tabMappings).filter(url => url !== undefined) as string[];
    }

    // Retrieve tabs initially even without update
    onMount(async function() {
        // Get all currently opened windows and iterate through tabs
        const windows = await browser.windows.getAll({ populate: true });
        for(const window of windows) {
            // Retrieve and add URLs for indivdual tabs
            (window.tabs || [])
                .filter(tab => tab.id !== undefined)
                .forEach(tab => tabMappings[tab.id as number] = tab.url);
        }

        // Register listeners for updating tab URLs whenever changed
        browser.tabs.onCreated.addListener(function(tab) {
            // Somehow tab ID can be undefined, not even sure how 
            if(tab.id !== undefined) {
                tabMappings[tab.id] = tab.url;
            }
        });
        browser.tabs.onUpdated.addListener(function(tabId, changeInfo) {
            // Don't waste by processing useless updates
            if(changeInfo.status === "loading" && changeInfo.url !== undefined) {
                tabMappings[tabId] = changeInfo.url;
            }
        });
        browser.tabs.onRemoved.addListener(function(tabId, removeInfo) {
            delete tabMappings[tabId];
            tabMappings = tabMappings; // Force reaction
        });
    });
</script>