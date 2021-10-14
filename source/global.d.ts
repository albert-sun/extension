import type { Browser } from "webextension-polyfill-ts";
import jQuery from "jquery";

declare global {
    const $: jQuery;
    const browser: Browser;
}