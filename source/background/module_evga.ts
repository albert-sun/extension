import type { EVGAFormTokens, EVGAProductData, EVGATokenMetadata } from "../shared/types";

// Scrapes relevant tokens and product information from given EVGA store page
// Return separated sets of scraped values depending on what's set to be scraped
// Note that sorting method (Low-High, etc.) matter because items are indexed
async function scrapeEVGA(
    url: string, scraped: string[] = ["tokens", "products"]
): Promise<[EVGATokenMetadata, EVGAProductData[], EVGAFormTokens]> {
    // Retrieve URL HTML via fetch and parse 
    const pageHTML = await (await fetch(url)).text();
    const pageNodes = $.parseHTML(pageHTML); // Use jQuery to emulate DOM?

    // Parse CSRF token and metadata like product type, family, etc.
    // Always parse regardless of scraped because it includes both
    const tokenMetadata: EVGATokenMetadata = {};
    const mainProductDiv = $(pageNodes).find("div.main-product")[0];
    const tokenMetadataInputs = $(mainProductDiv).find("input").toArray() as HTMLInputElement[];
    tokenMetadataInputs.forEach(input => { tokenMetadata[input.name] = input.value });

    // Parse individual product information from page
    // Note that index matters for POST request
    const productData: EVGAProductData[] = [];
    if(scraped.includes("products")) { // Increase performance by only scraping necessary
        const productListingDivs = $(pageNodes).find("div.list-item").toArray();
        for(const productListingDiv of productListingDivs) {
            // Retrieve necessary data via selectors using jQuery, unperformant?
            const displayAnchor = $(productListingDiv).find("div.pl-list-pname > a")[0] as HTMLAnchorElement;
            const display = displayAnchor.innerText; // Unshortened including name, SKU, and other data
            const shortened = display.split(",")[0]; // Shortened hopefully only including name
            const productNumberParagraph = $(productListingDiv).find("p.pl-list-pn")[0] as HTMLParagraphElement;
            const productNumber = productNumberParagraph.innerText.split("P/N: ")[1];
            const idAnchor = $(productListingDiv).find("div.pl-list-image > a")[0] as HTMLAnchorElement;
            const {1: index0, 2: index1} = idAnchor.id.match(/ctrl(\d+)_ctrl(\d+)_/) as RegExpMatchArray; 
        
            // Format data and append to list of products
            productData.push({
                display, shortened, productNumber,
                indexes: [parseInt(index0), parseInt(index1)],
            });
        }
    }

    // Parse __VIEWSTATE and other tokens for POST requests
    const formTokens: EVGAFormTokens = {};
    if(scraped.includes("tokens")) { // Increase performance by only scraping necessary
        // Scrape ASP.Net div and ncFormInfo from existing page
        const apspNetInputs = $(pageNodes).find("div.aspNetHidden > input").toArray() as HTMLInputElement[];
        apspNetInputs.forEach(input => { formTokens[input.name] = input.value });
        const ncFormInfoInput = $(pageNodes).find("input[name='__ncforminfo']")[0] as HTMLInputElement;
        formTokens[ncFormInfoInput.name] = ncFormInfoInput.value;
    }

    return [tokenMetadata, productData, formTokens];
}