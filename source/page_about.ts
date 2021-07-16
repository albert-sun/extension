import SimpleBar from "simplebar";

const pageName = "about";

// Page startup wrapper for loading content and scripting
const pageWrapper = $(`.${pageName}`)[0];
new SimpleBar(pageWrapper, { autoHide: false });
const pageContent = $(pageWrapper).find(".content-main");
pageContent.load(`/pages/${pageName}.html`, function() {
});