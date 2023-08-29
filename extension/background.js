```javascript
import { scrapeWebsite } from './content.js';
import { readPdf } from './pdfReader.js';
import { generateSummary } from './gpt4Api.js';

let websiteData = {};
let pdfData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'scrapeWebsite') {
    scrapeWebsite().then(data => {
      websiteData = data;
      sendResponse({ message: 'Website scraped successfully' });
    });
  } else if (request.message === 'readPdf') {
    readPdf(request.pdfInput).then(data => {
      pdfData = data;
      sendResponse({ message: 'PDF read successfully' });
    });
  } else if (request.message === 'generateSummary') {
    generateSummary(websiteData, pdfData).then(data => {
      sendResponse({ message: 'Summary generated successfully', summaryData: data });
    });
  }
  return true;
});
```