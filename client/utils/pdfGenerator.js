
import PDFDocument from 'pdfkit';


const generatePDF = (transactions) => {
   
  const doc = new PDFDocument();
  const buffer = [];

  
  const stream = doc.pipe(fs.createWriteStream('transactions.pdf'));

  doc.on('data', (data) => {
    buffer.push(data);
  });

  doc.on('end', () => {
    const pdfData = Buffer.concat(buffer);
    return pdfData;
  });

  doc.fontSize(18).text('Transaction History ', { underline: true });
  doc.moveDown();

 
  transactions.forEach((transaction) => {
    doc.fontSize(13).text(`title: ${transaction.title}`);
    doc.fontSize(12).text(`Amount: ${transaction.amount}`);
    doc.fontSize(12).text(`Date: ${new Date(transaction.createdAt).toLocaleDateString()}`);
    doc.fontSize(11).text(`Date: ${transaction.transactionType}`);
    doc.fontSize(12).text(`Description: ${transaction.description}`);
    doc.moveDown();
  });

  // Finalize the PDF document and close the stream
  doc.end();

 
};

export default generatePDF;