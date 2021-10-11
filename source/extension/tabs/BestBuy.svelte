<script lang="ts">
    import Accordion from "../components/Accordion.svelte";
    import TabHeader from "../components/TabHeader.svelte";
    import Button from "../components/Button.svelte";
    import { rawBestBuyItems } from "../../shared/constants";
    import type { AccordionData } from "../../shared/types";
    import { sendMessageToContent } from "../../shared/utilities";
    
    const urlMatch = "https://*.bestbuy.com/*";
    const openURL = "https://www.bestbuy.com/";
    let matches = false; // Whether content script found

    // When button clicked, add item to cart (without queue d ata)
    async function addToCart(sku: string) {
        // Throw and forget message, background automatically intercepts queue
        await sendMessageToContent("extension", "bestbuy", "process-atc", [sku]);
    }

    // Generate accordion data from raw data for convenience purposees
    // Must instantiate here instead of constants because of Button component
    const bestBuyItems: AccordionData = Object.entries(rawBestBuyItems).reduce((obj, [rawCategoryKey, rawCategoryData]) => {
        obj[rawCategoryKey] = { 
            display: rawCategoryData.display, 
            items: rawCategoryData.items.map(item => ({
                display: item.display,
                component: Button,
                props: { args: [item.data] }
            })),
        }
        
        return obj;
    }, {} as AccordionData);
    
    let defaultProps: { [key: string]: any };
    $: defaultProps = {
        "display": "Add to Cart",
        "disabled": !matches,
        "onclick": addToCart,
    };
</script>

<TabHeader urlMatch={urlMatch}
    openURL={openURL}
    bind:matches={matches}/>
<div class="flex-column column-spacing-small content">
    <p class="header">Manual Add-to-Cart Selection</p>
    <p>Attempt to manually add items to cart from accordion dropdowns.
        Probably won't work for most items, but when applicable generates and
        automatically tracks queue data returned from the attempted request.</p>
    <Accordion accordionData={bestBuyItems}
        defaultProps={defaultProps}
        deselectable={true}/>
</div>