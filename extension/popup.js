```javascript
document.addEventListener('DOMContentLoaded', function() {
    let pdfInput = document.getElementById('pdfInput');
    let summaryButton = document.getElementById('summaryButton');
    let downloadButton = document.getElementById('downloadButton');

    summaryButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'scrapeWebsite'}, function(response) {
            let websiteData = response.websiteData;
            let pdfData = pdfInput.files[0] ? readPdf(pdfInput.files[0]) : null;
            chrome.runtime.sendMessage({message: 'generateSummary', websiteData: websiteData, pdfData: pdfData}, function(response) {
                let summaryData = response.summaryData;
                createMemorandum(summaryData);
            });
        });
    });

    downloadButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'downloadMemorandum'}, function(response) {
            downloadFile(response.memorandum);
        });
    });
});

function readPdf(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
        let pdfData = e.target.result;
        chrome.runtime.sendMessage({message: 'readPdf', pdfData: pdfData}, function(response) {
            return response.pdfData;
        });
    };
    reader.readAsArrayBuffer(file);
}

function createMemorandum(summaryData) {
    chrome.runtime.sendMessage({message: 'createMemorandum', summaryData: summaryData}, function(response) {
        return response.memorandum;
    });
}

function downloadFile(file) {
    let url = URL.createObjectURL(file);
    chrome.downloads.download({url: url, filename: 'InformationMemorandum.pdf'});
}
```