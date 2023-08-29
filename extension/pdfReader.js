```javascript
const pdfjsLib = require('pdfjs-dist');

let pdfData = {};

function readPdf() {
  const pdfInput = document.getElementById('pdfInput');
  const file = pdfInput.files[0];

  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let data = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(data).promise.then(function(pdf) {
        let totalPages = pdf.numPages;
        let pagesPromises = [];

        for (let i = 0; i < totalPages; i++) {
          pagesPromises.push(pdf.getPage(i + 1));
        }

        Promise.all(pagesPromises).then(function(pages) {
          pages.forEach(function(page) {
            page.getTextContent().then(function(textContent) {
              pdfData[page.pageNumber] = textContent.items.map(item => item.str).join(' ');
            });
          });
        });
      });
    };
    reader.readAsArrayBuffer(file);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'readPdf') {
    readPdf();
    sendResponse({message: 'PDF read successfully', pdfData: pdfData});
  }
});
```