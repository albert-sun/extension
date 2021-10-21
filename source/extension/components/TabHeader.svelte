<script lang="ts">
    import { tabURLs } from "../../shared/initializations";
    import { urlGlob } from "../../shared/utilities";

    export let urlMatch: string;  // [INPUT] URL match to check open tabs for
    export let openURL: string;   // [INPUT] URL to open when button clicked
    export let autoOpen: boolean; // [INPUT] Boolean, whether to automatically open tabs 
    export let matches: boolean;  // [OUTPUT] Whether the content script is loaded
    tabURLs.subscribe(value => { 
        matches = (value).filter(url => urlGlob(urlMatch, url)).length > 0;
    });

    // Opens new tab instead of using link for focus purposes
    function openTab() {
        browser.tabs.create({
            url: openURL,
            active: false,
        });
    }
</script>

{#if matches === false && autoOpen === false}
    <div class="flex-row status-row">
        <!-- <p>Successfully detected running content script, no action needed</p> -->
        <!-- Display link to open URL -->
        <p>Couldn't find tab running content script, functionality disabled</p>
        <a on:click={openTab} target="_blank">Open tab</a>
    </div>
{/if}

<style lang="scss">
    div.status-row {
        padding: 0.5em;
        justify-content: space-between;
        color: var(--color-white);
        background-color: var(--color-teal-darker);

        /* Override color */
        a { 
            color: inherit; 
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>