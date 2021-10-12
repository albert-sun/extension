<script lang="ts">
    import Button from "./Button.svelte";
    import { bestBuyDisplays } from "../../shared/constants";
    import type { QueueData } from "../../shared/types";
    import { extensionLog, sendMessageToContent } from "../../shared/utilities";
    import { minutesSeconds } from "../utilities";

    export let remainingTime: number; // [INPUT] Remaining time before queue pop, in milliseconds
    export let sku: string;           // [INPUT] Product SKU for manual add-to-cart or page button
    export let queueData: QueueData;  // [INPUT] (TODO) Queue data for manual add-to-carting?
    export let disabled: boolean;     // [INPUT] Default prop to send to button
    export let deleteQueue: Function; // [INPUT] Delete queue with given ID and broadcast to background
    const productName = bestBuyDisplays[sku];

    // Parse remaining time into minutes and seconds
    let queuePopped: boolean = false; // Whether time is negative
    let remainingDisplay: string = "";
    $: {
        queuePopped = remainingTime <= 0;
        const [minutes, seconds, negative] = minutesSeconds(remainingTime, true);
        remainingDisplay = `${negative === true ? "-" : ""}${minutes}m ${seconds}s`;
    }

    // Opens new unfocused tab for product with given SKU
    function openProductPage() {
        const pageURL = `https://www.bestbuy.com/site/${sku}.p`;
        browser.tabs.create({
            url: pageURL,
            active: false,
        });
    }

    // (TODO) Manually add-to-cart from queue display
    async function manualAddToCart() {
        extensionLog("extension", `Attempting to add QUEUED product ${productName} to cart`);

        // Throw and forget for now, eventually parse and toast result
        await sendMessageToContent("extension", "bestbuy", "process-atc", [sku, queueData]);
    }
</script>

<div class="flex-row info-wrapper">
    <div class="flex-column column-spacing-small info-column">
        <!-- First row with both buttons -->
        <div class="flex-row row-spacing-small">
            <Button display="Page"
                disabled={disabled}
                onclick={openProductPage}/>
            <Button display="Add"
                disabled={disabled}
                onclick={manualAddToCart}/>
            <Button display="Delete"
                disabled={disabled}
                onclick={deleteQueue}/>
        </div>
    
        <!-- Second row with remaining queue time -->
        <p class:popped={queuePopped === true}>{remainingDisplay}</p>
    </div>
</div>

<style lang="scss">
    div.info-wrapper {
        justify-content: flex-end;
    }

    div.info-column {
        align-items: center;
        justify-content: center;
    }

    p.popped {
        color: var(--color-red);
    }
</style>