import { browser } from "webextension-polyfill-ts";
import $ from "jquery";

// Show version info on bottom left corner from manifest
const manifestData = browser.runtime.getManifest();
$("#version")[0].innerText = `Version ${manifestData.version}`;

// Tab clicking and "switching" functionality
let activeTab: HTMLElement;
let activeContent: HTMLElement; 
$(".sidebar").find("a").toArray().forEach(function(tabButton: HTMLElement) {
    // Set clicked tab as active and load respective HTML
    tabButton.onclick = function() {
        // Update currently active highlighted tab
        activeTab.classList.remove("active");
        tabButton.classList.add("active");
        activeTab = tabButton;

        // Set content for respective tab as top-most
        activeContent.style.zIndex = "0";
        const tabContent = $(`div.${tabButton.getAttribute("tag")}`)[0];
        tabContent.style.zIndex = "1";
        $(activeContent).find(".simplebar-content-wrapper")[0].scrollTop = 0;
        activeContent = tabContent;
    };
});

// Set default tab to "About"
activeTab = $("#default-tab")[0];
activeTab.classList.add("active");
activeContent = $("#default-content")[0];
activeContent.style.zIndex = "1";