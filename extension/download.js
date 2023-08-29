```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'downloadMemorandum') {
        downloadFile(request.summaryData);
    }
});

function downloadFile(summaryData) {
    const blob = new Blob([summaryData], {type: "text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: 'Information_Memorandum.txt',
        conflictAction: 'uniquify',
        saveAs: true
    });
}
```