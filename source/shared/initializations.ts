import { writable } from "../../node_modules/svelte/store";
import type { BestBuyQueuesData, ChangelogVersion, RawAccordionData, SettingLabels, Settings, WritableWrapper } from "./types";
import { initializeStore, reduceDisplays } from "./utilities";

// Any imports that are CALLED on initialization must be declared within a separate file
export const tabURLs = writable([] as string[]); // tab URLs shared between components
export const settings: WritableWrapper<Settings> = await initializeStore<Settings>( "settings", {});
export const bestBuyQueues: WritableWrapper<BestBuyQueuesData> = await initializeStore<BestBuyQueuesData>( "bestbuy-queues", {});
export const changelogs: ChangelogVersion[] = await $.ajax("../resources/changelog.json", { data: "json" });
export const settingsDisplays: SettingLabels = await $.ajax("../resources/settings.json", { data: "json" });
export const rawBestBuyItems: RawAccordionData = await $.ajax("../resources/items_bestbuy.json", { data: "json" });
export const bestBuyDisplays: { [sku: string]: string } = reduceDisplays(rawBestBuyItems);