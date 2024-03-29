Shared Dependencies:

1. Exported Variables:
   - `websiteData`: The data scraped from the current website, shared between `content.js`, `background.js`, and `gpt4Api.js`.
   - `pdfData`: The data extracted from the PDF pitch deck, shared between `pdfReader.js`, `background.js`, and `gpt4Api.js`.
   - `summaryData`: The summarized data generated by GPT-4 API, shared between `gpt4Api.js`, `informationMemorandum.js`, and `download.js`.

2. Data Schemas:
   - `WebsiteSchema`: Schema for the website data, used in `content.js` and `background.js`.
   - `PdfSchema`: Schema for the PDF data, used in `pdfReader.js` and `background.js`.
   - `SummarySchema`: Schema for the summarized data, used in `gpt4Api.js`, `informationMemorandum.js`, and `download.js`.

3. ID Names of DOM Elements:
   - `pdfInput`: The input field for the PDF pitch deck in `popup.html`, used in `popup.js` and `pdfReader.js`.
   - `summaryButton`: The button to generate the summary in `popup.html`, used in `popup.js`, `background.js`, and `gpt4Api.js`.
   - `downloadButton`: The button to download the Information Memorandum in `popup.html`, used in `popup.js` and `download.js`.

4. Message Names:
   - `scrapeWebsite`: Message sent from `popup.js` to `background.js` to initiate website scraping.
   - `readPdf`: Message sent from `popup.js` to `background.js` to initiate PDF reading.
   - `generateSummary`: Message sent from `background.js` to `gpt4Api.js` to initiate summary generation.
   - `downloadMemorandum`: Message sent from `popup.js` to `download.js` to initiate the download of the Information Memorandum.

5. Function Names:
   - `scrapeWebsite()`: Function in `content.js` to scrape the website data.
   - `readPdf()`: Function in `pdfReader.js` to read the PDF data.
   - `generateSummary()`: Function in `gpt4Api.js` to generate the summary using GPT-4 API.
   - `createMemorandum()`: Function in `informationMemorandum.js` to create the Information Memorandum.
   - `downloadFile()`: Function in `download.js` to download the Information Memorandum.