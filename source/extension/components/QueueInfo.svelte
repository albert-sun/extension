<script lang="ts">
    import Button from "./Button.svelte";
    import { bestBuyDisplays, extensionSelf } from "../../shared/constants";
    import type { ProductQueueData } from "../../shared/types";
    import { extensionLog, openPage, sendRequestBackground } from "../../shared/utilities";
    import { minutesSeconds } from "../utilities";
import type { StreamlinedRequestRaw, StreamlinedResponse } from "../../shared/types_new";

    export let remainingTime: number;        // [INPUT] Remaining time before queue pop, in milliseconds
    export let sku: string;                  // [INPUT] Product SKU for manual add-to-cart or page button
    export let queueData: ProductQueueData;  // [INPUT] (TODO) Queue data for manual add-to-carting?
    export let disabled: boolean;            // [INPUT] Default prop to send to button
    export let deleteQueue: Function;        // [INPUT] Delete queue with given ID and broadcast to background
    const productName = bestBuyDisplays[sku];
    const pageURL = `https://www.bestbuy.com/site/${sku}.p`;

    // Parse remaining time into minutes and seconds
    let queuePopped: boolean = false; // Whether time is negative
    let remainingDisplay: string = "";
    $: {
        queuePopped = remainingTime <= 0;
        const [minutes, seconds, negative] = minutesSeconds(remainingTime, true);
        remainingDisplay = `${negative === true ? "-" : ""}${minutes}m ${seconds}s`;
    }

    // (TODO) Manually add-to-cart from queue display
    async function manualAddToCart() {
        extensionLog("extension", `Attempting to add QUEUED ${productName} to cart`);

        // Queue add-to-cart request 
        await sendRequestBackground(
            "process-atc",
            [sku, queueData.a2cTransactionReferenceId, queueData.a2cTransactionCode],
        ); // Send to background script which processes sequentially
    }

    // Broadcast queue deletion upwards with arguments
    function deleteWithArgs() {
        // Logging from top-level deleteQueue

        deleteQueue(sku, queueData.a2cTransactionReferenceId)
    }
</script>

<div class="flex-row info-wrapper">
    <div class="flex-column column-spacing-small info-column">
        <!-- First row with two buttons -->
        <div class="flex-row row-spacing-small">
            <Button display="Page"
                disabled={disabled}
                onclick={() => { openPage(pageURL) }}/>
            <Button display="Add"
                disabled={disabled}
                onclick={manualAddToCart}/>
            <Button display="Del"
                disabled={disabled}
                onclick={deleteWithArgs}/>
        </div>
    
        <!-- Second row with remaining queue time -->
        <div class="flex-row row-spacing-small">
            <p class:popped={queuePopped === true}>{remainingDisplay}</p>
        </div>
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