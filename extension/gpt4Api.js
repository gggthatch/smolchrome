```javascript
const axios = require('axios');

let websiteData = {};
let pdfData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'generateSummary') {
    websiteData = request.websiteData;
    pdfData = request.pdfData;
    generateSummary(websiteData, pdfData)
      .then(summaryData => sendResponse({message: 'summaryGenerated', summaryData}))
      .catch(err => console.error(err));
    return true;  // Will respond asynchronously.
  }
});

async function generateSummary(websiteData, pdfData) {
  const data = {
    documents: [
      { text: websiteData.content },
      { text: pdfData.content }
    ]
  };

  try {
    const response = await axios.post('https://api.openai.com/v4/engines/davinci-codex/completions', data, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const summaryData = response.data.choices[0].text;
    return formatSummary(summaryData);
  } catch (error) {
    console.error(error);
  }
}

function formatSummary(rawSummary) {
  const summarySchema = {
    title: websiteData.title || pdfData.title,
    summary: rawSummary,
    source: websiteData.url || pdfData.filename
  };

  return summarySchema;
}
```