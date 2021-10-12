<script lang="ts">
    import Navigation from "./components/Navigation.svelte";
    import TabDomains from "./components/TabDomains.svelte";
    import About from "./tabs/About.svelte";
    import BestBuy from "./tabs/BestBuy.svelte";
    import Changelog from "./tabs/Changelog.svelte";
    import Settings from "./tabs/Settings.svelte";
    import type { NavigationItem } from "./types";

    // Navigation items top, middle, and bottom-aligned
    const navigationTop: NavigationItem[] = [
        { display: "About", key: "about", component: About },
        { display: "Settings", key: "settings", component: Settings },
        { display: "Changelog", key: "changelog", component: Changelog },
    ];
    const navigationBottom: NavigationItem[] = [
        { display: "Best Buy", key: "bestbuy", component: BestBuy },
    ];
</script>

<Navigation navigationTop={navigationTop}
    navigationBottom={navigationBottom}
    initial="about">
</Navigation>
<TabDomains/>

<style lang="scss">
    /* CSS variables for reference */
    :global(:root) {
        /* Miscellaneous shades */
        --color-red: red;
        /* Teal shades */
        --color-teal-darkest: #215e5e;
        --color-teal-darker: #2b7979;
        --color-teal-dark: #349494;
        --color-teal-normal: #3eafaf;
        --color-teal-light: #50c1c1;
        /* White/grey/black shades */
        --color-black: #000000; 
        --color-darkestgrey: #0d0d0d; 
        --color-darkergrey: #404040; 
        --color-darkgrey: #595959; 
        --color-grey: #8c8c8c; 
        --color-lightgrey: #a6a6a6; 
        --color-lightergrey: #bfbfbf; 
        --color-lightestgrey: #f2f2f2; 
        --color-white: #ffffff; 
        /* Standardized em measurements */
        --flex-margin-large: 1em;
        --flex-margin-medium: 0.5em;
        --flex-margin-small: 0.25em;
        --padding-large: 0.5em;
        --padding-small: 0.25em;
    }

    /* Overrides for element types */
    :global(body) {
        width: 800px;
        height: 500px;
        margin: 0px !important;
        padding: 0px !important;
        box-sizing: border-box;
        font-size: 16px;
        font-family: Arial;
        background-color: var(--background-darkest);
        color: var(--text-lighter);
    }
    :global(p) { margin: 0px; padding: 0px; }
    :global(h1) { margin: 0px; padding: 0px; }
    :global(h2) { margin: 0px; padding: 0px; }
    :global(h3) { margin: 0px; padding: 0px; }
    :global(div) { box-sizing: border-box; margin: 0px; padding: 0px; }
    :global(input) { 
        display: inline;
        appearance: none;
        box-shadow: none !important;
        font-size: inherit;
        font-family: inherit;
        border: 2px solid var(--color-darkergrey);
        background-color: var(--color-white);
        color: inherit;

        &:focus { outline: none; }
    }
    :global(input[type='number']) {
        -moz-appearance:textfield; /* Firefox */
        text-align: right;
    }
    :global(input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button) {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    /* Flexbox row functionality */
    :global(.flex-row) {
        display: flex;
        flex-direction: row;
    }
    :global(.row-spacing-small > *) { margin-right: 0.5em; }
    :global(.row-spacing-small > :last-child) { margin-right: 0px; }
    :global(.row-spacing-large > *) { margin-right: 1em; }
    :global(.row-spacing-large > :last-child) { margin-right: 0px; }

    /* Flexbox column functionality */
    :global(.flex-column) {
        display: flex;
        flex-direction: column;
    }
    :global(.column-spacing-small > *) { margin-bottom: 0.5em; }
    :global(.column-spacing-small > :last-child) { margin-bottom: 0px; }
    :global(.column-spacing-large > *) { margin-bottom: 1em; }
    :global(.column-spacing-large > :last-child) { margin-bottom: 0px; }

    /* Flexbox middle growable for alignment */
    :global(.middle-grow) { flex-grow: 1; }

    :global(.header) {  
        font-size: 1.25em;
        text-decoration: underline;
    }
</style>