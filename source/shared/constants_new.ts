import type { BestBuyQueuesData, DomainMatches, Settings } from "../shared/types";
import type { WritableWrapper } from "../shared/types_new";
import { initializeStore } from "./utilities_new";

export const domainMatches: DomainMatches = {
    "bestbuy": "https://*.bestbuy.com/*",
}; // Domain matches for sending messages from background or extension
