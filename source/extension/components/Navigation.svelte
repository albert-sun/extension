<script lang="ts">
    import type { NavigationItem } from "../types";

    export let navigationTop: NavigationItem[] = [];    // [INPUT] Top-aligned navigation items
    export let navigationMiddle: NavigationItem[] = []; // [INPUT] Top-aligned navigation items
    export let navigationBottom: NavigationItem[] = []; // [INPUT] Top-aligned navigation items
    export let initial: string = "";                    // [INPUT] Initially selected navigation item
    // Custom props including tab URLs

    let selected: string = initial; // Only assign initially
    let navigationItems = [...navigationTop, ...navigationMiddle, ...navigationBottom];

    // Onclick handler for switching selected navigation
    function navigationClick(key: string) {
        selected = key;
    }
</script>

<div class="flex-row"
    style="height: 100%; width: 100%">
    <!-- Navigation sidebar for selection -->
    <div class="navigation flex-column">
        <!-- Top-aligned navigation items -->
        {#each navigationTop as navigationItem}
            <a class="navigation-link"
                class:navigation-selected={navigationItem.key === selected}
                on:click={() => { navigationClick(navigationItem.key) }}>
                {navigationItem.display}
            </a>
        {/each}
    
        <!-- Spacer between top and middle sets of items -->
        <div class="middle-grow"></div>

        <!-- Middle-aligned navigation items -->
        {#each navigationMiddle as navigationItem}
            <a class="navigation-link"
                class:navigation-selected={navigationItem.key === selected}
                on:click={() => { navigationClick(navigationItem.key) }}>
                {navigationItem.display}
            </a>
        {/each}

        <!-- Spacer between middle and bottom sets of items -->
        <div class="middle-grow"></div>
    
        <!-- Bottom-aligned navigation items -->
        {#each navigationBottom as navigationItem}
            <a class="navigation-link"
                class:navigation-selected={navigationItem.key === selected}
                on:click={() => { navigationClick(navigationItem.key) }}>
                {navigationItem.display}
            </a>
        {/each}
    </div>

    <!-- Container for holding tab contents -->
    <div class="contents-wrapper">
        <!-- Stacked components swapped using z-indexes -->
        {#each navigationItems as navigationItem}
            <div class="content-wrapper"
                class:content-selected={navigationItem.key === selected}>
                <!-- To prevent from overriding bounds -->
                <svelte:component this={navigationItem.component}/>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    /* Navigation header */
    div.navigation {
        background-color: var(--color-lightestgrey);

        a.navigation-link {
            width: 5em;
            display: block;
            padding: 0.5em 0.75em 0.5em 0.75em;
            text-decoration: none;
            font-size: 1.25em;
            cursor: pointer;
            color: var(--color-black);
            user-select: none;
            transition: 0.1s;

            &.navigation-selected { 
                color: var(--color-white);
                background-color: var(--color-teal-darker); 
            }
            &:hover:not(.navigation-selected) {
                color: var(--color-white);
                background-color: var(--color-darkgrey);

                &:active { background-color: var(--color-darkergrey); }
            }
        }
    } 

    /* Container for holding wrappers */
    div.contents-wrapper {
        flex-grow: 1;
        height: 100%;
    }

    /* Navigation content component */
    div.content-wrapper {
        height: 100%;
        width: 670px;
        position: fixed;
        z-index: 0;
        overflow-y: scroll;
        font-size: 16px;
        font-family: Arial;
        background-color: var(--color-white);
    }

    div.content-selected { z-index: 10 !important; }

    :global(div.content) { padding: 1em; }
</style>