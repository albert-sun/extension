import type { BestBuyQueuesData, Settings, WritableWrapper } from "./types";
import { initializeStore } from "./utilities";

// Any imports that are CALLED on initialization must be declared within a separate file
export const settings: WritableWrapper<Settings> = await initializeStore<Settings>( "settings", {});
export const bestBuyQueues: WritableWrapper<BestBuyQueuesData> = await initializeStore<BestBuyQueuesData>( "bestbuy-queues", {});