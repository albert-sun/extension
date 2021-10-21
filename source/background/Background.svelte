<script lang="ts">
    import { onMount } from "svelte";
    import type { MessageHandlers } from "../shared/types";
    import { messageProcessHandlers } from "../shared/utilities";
    import { mergeProductQueues, processAddToCart, setupBestBuyRequestHandlers } from "./module_bestbuy";
    import { addSyncRequest, createTabReady, mergeSettings, soundNotification } from "./module_main";

    // Initialize writables beforehand to prevent errors
    const loggingSelf = "background";

    // Async doesn't include destructor, don't care
    onMount(async function() {        
        await mergeSettings(); // Merge settings with display values
        setupBestBuyRequestHandlers(); // Setup ATC webRequest interception handlers
        setupBestBuyInterval(); // Setup interval for automatically ATCing and trimming

        // Register Messages API listener for processing handlers
        const messageHandlers: MessageHandlers = {
            // Background
            "add-sync-request": addSyncRequest,
            "create-tab-ready": createTabReady,
            "sound-notification": soundNotification,
            // Best Buy
            "merge-product_queues": mergeProductQueues,
            "background-add_to_cart": processAddToCart,
        }; // Message handlers for processing from Messages API
        messageProcessHandlers(loggingSelf, messageHandlers);
    });
</script>