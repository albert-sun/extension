import SimpleBar from "simplebar";
import { changelogs } from "./constants";

const pageName = "changelog";

// Page startup wrapper for loading content and scripting
const pageWrapper = $(`.${pageName}`)[0];
new SimpleBar(pageWrapper, { autoHide: false });
const pageContent = $(pageWrapper).find(".content-main");
pageContent.load(`/pages/${pageName}.html`, function() {
    // Add each changelog as a separate div into the main div
    const changelogsDiv = $("#changelog-contents")[0];
    for(const changelog of changelogs) {
        const brk = document.createElement("br");
        changelogsDiv.appendChild(brk);

        const changelogDiv = document.createElement("div");
        changelogDiv.id = `changelog-${changelog.version}`;
        changelogsDiv.appendChild(changelogDiv);

        // Add the version and description paragraph
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("changelog-title");
        changelogDiv.appendChild(titleParagraph);
        titleParagraph.innerHTML = `<b>${changelog.version}</b>`;

        // Add each bullet point as a paragraph underneath
        for(const bulletpoint of changelog.bulletpoints) {
            const bulletParagraph = document.createElement("p");
            bulletParagraph.classList.add("bulletpoint");
            changelogDiv.appendChild(bulletParagraph);
            bulletParagraph.innerHTML = `\u2022 ${bulletpoint}`;
        }
    }
});