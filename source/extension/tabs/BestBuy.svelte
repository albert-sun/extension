<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import Accordion from "../components/Accordion.svelte";
    import Button from "../components/Button.svelte";
    import QueueInfo from "../components/QueueInfo.svelte";
    import TabHeader from "../components/TabHeader.svelte";
    import { bestBuyDisplays, extensionSelf, rawBestBuyItems } from "../../shared/constants";
    import type { AccordionData, AccordionItemData, BestBuyQueuesData, Setter, Settings } from "../../shared/types";
    import { extensionLog, initializeStore, sendRequestBackground } from "../../shared/utilities";
    import type { StreamlinedRequestRaw } from "../../shared/types_new";
    
    const urlMatch = "https://*.bestbuy.com/*";
    const openURL = "https://www.bestbuy.com/";
    let matches = false; // Whether content script found
    let queues: Writable<BestBuyQueuesData>;
    let setQueues: Setter;

    // When button clicked, add item to cart (without queue d ata)
    async function addToCart(sku: string) {
        const productName = bestBuyDisplays[sku];

        extensionLog("extension", `Attempting to add ${productName} to cart from extension`);

        // Queue add-to-cart request sequentially
        // TODO show error if tab not found?
        const request: StreamlinedRequestRaw = {
            urlMatch: "bestbuy",
            handler: "process-atc",
            args: [sku],
        };
        await sendRequestBackground(
            "add-request", 
            [request],
        );
    }

    // Delete given queue and broadcast update
    async function deleteQueue(sku: string, queueId: string) {
        extensionLog("extension", `Deleting given queue from sku ${sku}`)

        const skuQueueData = $queues[sku] || {}; // Failsafe
        delete skuQueueData[queueId];
        setQueues(sku, skuQueueData);
    }

    // Re-calculate and re-render the queue data
    let accordionQueues: AccordionData = {};
    function updateQueueData() {
        // Construct the accordion data before sorting by remaining time?
        const currentTime = new Date().getTime();
        const accordionQueueData = Object.entries($queues).reduce((obj, [sku, skuQueueData]) => {
            // Iterate over SKU queue data and add to aggregate
            for(const [queueId, queueData] of Object.entries(skuQueueData)) {
                // Calculate remaining time for sorting purposes
                const remainingTime = queueData.startTime + queueData.queueTime - currentTime;
                obj.push({
                    display: bestBuyDisplays[sku],
                    component: QueueInfo,
                    props: { remainingTime, sku, queueData },
                })
            };

            return obj;
        }, [] as AccordionItemData[]);

        // Sort the queues by remaining time for display
        accordionQueueData.sort((data1, data2) => {
            return data1.props["remainingTime"] - data2.props["remainingTime"];
        });

        // Update accordion queues and force re-render?
        accordionQueues = {
            "queues": {
                display: `${accordionQueueData.length} Queue(s) (Sorted Soonest -> Latest Available)`,
                items: accordionQueueData,
            }
        };
    }

    // Default props sent to component for queue
    let defaultQueueProps: { [key: string]: any };
    $: defaultQueueProps = {
        "disabled": !matches,
        "deleteQueue": deleteQueue,
    };

    // Generate accordion data from raw data for convenience purposees
    // Must instantiate here instead of within constants.ts because of Button Svelte component
    const accordionItems: AccordionData = Object.entries(rawBestBuyItems).reduce((obj, [rawCategoryKey, rawCategoryData]) => {
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
    
    // Default props sent to component for manual ATC
    let defaultAddProps: { [key: string]: any };
    $: defaultAddProps = {
        "display": "Add to Cart",
        "disabled": !matches,
        "onclick": addToCart,
    };

    // Does not include destructor, don't care
    onMount(async function() {
        // Initialize various stores (ignore setter and deleter because read-only)
        ({ store: queues, set: setQueues } = await initializeStore<BestBuyQueuesData>( "queues", {}));
        
        // Run re-render on interval and on queue update
        setInterval(() => { updateQueueData() }, 250);
        queues.subscribe(_ => { updateQueueData() });
    });
</script>

<TabHeader urlMatch={urlMatch}
    openURL={openURL}
    bind:matches={matches}/>
<div class="flex-column column-spacing-small content">
    <!-- Queue tracking section with collapsible accordion -->
    <p class="header">Currently Tracked Queues</p>
    <p>
        Queues currently being tracked by the extension - background script
        automatically intercepts and tracks response queues, then broadcasts
        add-to-cart requests with the attached queue headers paylaod. Failed
        requests are also retried periodically (see relevant settings) until
        the queue expires (in about five minutes). Note that spamming 
        add-to-cart requests can potentially lead to rate-limiting.
    </p>
    <Accordion accordionData={accordionQueues}
        defaultProps={defaultQueueProps}
        deselectable={true}/>

    <br>

    <!-- Manual add-to-cart section with collapsible accordion -->
    <p class="header">Manual Add-to-Cart Utilities</p>
    <p>
        Attempt to manually add items to cart from accordion dropdown buttons.
        Probably won't work for most constrained items, but more importantly
        intercepts and automatically tracks returned queue data when applicable.
    </p>
    <Accordion accordionData={accordionItems}
        defaultProps={defaultAddProps}
        deselectable={true}/>
</div>