<script lang="ts">
    import Button from "./Button.svelte";
    import { bestBuyDisplays, extensionSelf } from "../../shared/constants";
    import type { ProductQueueData } from "../../shared/types";
    import { extensionLog, openPage, sendMessageToBackground, sendMessageToContent } from "../../shared/utilities";
    import { minutesSeconds } from "../utilities";

    export let remainingTime: number;        // [INPUT] Remaining time before queue pop, in milliseconds
    export let sku: string;                  // [INPUT] Product SKU for manual add-to-cart or page button
    export let queueData: ProductQueueData;  // [INPUT] (TODO) Queue data for manual add-to-carting?
    export let disabled: boolean;            // [INPUT] Default prop to send to button
    export let deleteQueue: Function;        // [INPUT] Delete queue with given ID and broadcast to background
    const productName = bestBuyDisplays[sku];
    const pageURL = `https://www.bestbuy.com/site/${sku}.p`;
    const self = extensionSelf;

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
        extensionLog("extension", `Attempting to add QUEUED product ${productName} to cart`);

        // Throw and forget for now, eventually parse and toast result
        const response = await sendMessageToContent(self, "bestbuy", "process-atc", [
            sku,
            queueData.a2cTransactionReferenceId,
            queueData.a2cTransactionCode,
        ]); // Deconstruct and only send relevant parts of queue data
        if(response.payload === 200) {
            // Construct for sending notification with sound
            const title = "Best Buy - Successful Cart";
            const message = bestBuyDisplays[sku];
            sendMessageToBackground(self, "sound-notification", [
                "success", title, message, 
                ["bestbuy-notifications", "notificationSuccess"],
            ]); // Send category and settings key instead of setting
        }
    }

    // Broadcast queue deletion upwards with arguments
    function deleteWithArgs() {
        // Logging from top-level deleteQueue

        deleteQueue(sku, queueData.a2cTransactionReferenceId)
    }
</script>

<div class="flex-row info-wrapper">
    <div class="flex-column column-spacing-small info-column">
        <!-- First row with both buttons -->
        <div class="flex-row row-spacing-small">
            <Button display="Page"
                disabled={disabled}
                onclick={() => { openPage(pageURL) }}/>
            <Button display="Add"
                disabled={disabled}
                onclick={manualAddToCart}/>
            <Button display="Delete"
                disabled={disabled}
                onclick={deleteWithArgs}/>
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