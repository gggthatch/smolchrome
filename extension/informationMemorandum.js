```javascript
const jsPDF = require('jspdf');

function createMemorandum(summaryData) {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Information Memorandum', 20, 20);

    doc.setFontSize(16);
    doc.text(`Prepared by: ${summaryData.author}`, 20, 30);

    doc.setFontSize(12);
    doc.text(`Website: ${summaryData.website}`, 20, 40);
    doc.text(`PDF: ${summaryData.pdf}`, 20, 50);

    doc.setFontSize(14);
    doc.text('Summary:', 20, 60);
    doc.text(summaryData.summary, 20, 70);

    return doc;
}

module.exports = {
    createMemorandum
};
```