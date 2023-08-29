```javascript
// content.js

// Function to scrape the website data
function scrapeWebsite() {
    let websiteData = {
        title: document.title,
        url: window.location.href,
        text: document.body.innerText
    };

    // Validate the data against the WebsiteSchema
    if (validateWebsiteData(websiteData)) {
        return websiteData;
    } else {
        throw new Error("Invalid website data");
    }
}

// Function to validate the website data against the WebsiteSchema
function validateWebsiteData(data) {
    // Define the WebsiteSchema
    const WebsiteSchema = {
        title: "string",
        url: "string",
        text: "string"
    };

    // Check if the data matches the schema
    for (let key in WebsiteSchema) {
        if (typeof data[key] !== WebsiteSchema[key]) {
            return false;
        }
    }

    return true;
}

// Listen for the scrapeWebsite message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "scrapeWebsite") {
        try {
            let websiteData = scrapeWebsite();
            sendResponse({status: "success", data: websiteData});
        } catch (error) {
            sendResponse({status: "error", message: error.message});
        }
    }
});
```