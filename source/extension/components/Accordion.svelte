<script lang="ts">
    import { slide } from "svelte/transition";
    import type { AccordionData } from "../../shared/types";

    export let accordionData: AccordionData;         // [INPUT] Accordion data for generation purposes
    export let defaultProps: { [key: string]: any }; // [INPUT] Additional props to attach 
    export let deselectable: boolean = false;        // [INPUT] Whether categories can be deselected

    // Currently selected and expanded category
    // Determine default by whether deselectable allowed
    let focused: string = deselectable === true
        ? "" : Object.keys(accordionData)[0]; 

    // Onclick for category, selects and can maybe deselect
    function categoryClick(categoryKey: string) {
        if(categoryKey !== focused) {
            // Not currently focused, focuse
            focused = categoryKey;
        } else if(deselectable === true) {
            // Only deselect category if allowed
            focused = "";
        }
    }
</script>

<div class="flex-column accordion">
    {#each Object.entries(accordionData) as [categoryKey, categoryData]}
        <div class="flex-column accordion-category"
            class:category-selected={categoryKey === focused}>
            <!-- Accordion category header, separate from items -->
            <p class="category-header"
                on:click={() => { categoryClick(categoryKey) }}>
                {categoryData.display}
            </p>

            <!-- Only "expand" content if category selected -->
            {#if categoryKey === focused}
                <div class="flex-column category-items"
                    transition:slide={{ duration: 500 }}>
                    {#each categoryData.items as itemData}
                        <tr class="category-item">
                            <td class="cell-left">
                                <p class="item-display">{itemData.display}</p>
                            </td>
                            <td class="cell-right">
                                <svelte:component this={itemData.component} 
                                    {...itemData.props}
                                    {...defaultProps}/>
                            </td>
                        </tr>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    div.accordion {
        border-bottom: 2px solid var(--color-darkestgrey);
        border-right: 2px solid var(--color-darkestgrey);
        border-left: 2px solid var(--color-darkestgrey);
        width: 100%;

        div.accordion-category {
            background-color: var(--color-lightestgrey);

            p.category-header {
                padding: 0.5em;
                cursor: pointer;
                border-top: 2px solid var(--color-darkestgrey);
                background-color: var(--color-teal-dark);
                color: var(--color-white);
                user-select: none;
                transition: 0.2s;
            }

            &.category-selected > p.category-header {
                background-color: var(--color-teal-darkest);
            }
            &:not(.category-selected) > p.category-header:hover {
                background-color: var(--color-teal-darker);
            }
            &:not(.category-selected) > p.category-header:active {
                background-color: var(--color-teal-darkest);
            }

            div.category-items {
                width: 100%;
                padding: 0px;
                overflow: hidden;
                align-items: stretch;
                
                /* Copied from Settings? */
                tr.category-item {
                    padding: 0.25em 0.5em 0.25em 0.5em;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    &:first-child { padding-top: 0.5em; }
                    &:last-child { padding-bottom: 0.5em; }

                    td.cell-left {
                        width: 70%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: left; 
                    }

                    td.cell-right {
                        width: 30%;
                        justify-content: center;
                        align-items: center;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>