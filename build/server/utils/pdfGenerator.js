import PDFDocument from 'pdfkit';
import { catchAsync } from './catchAsync.js';
import AppError from './appError.js';


const generatePDF = (transactions) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffer = [];

    doc.on('data', (data) => {
      buffer.push(data);
    });

    doc.on('end', () => {
      const pdfData = Buffer.concat(buffer);
      resolve(pdfData);
    });

    doc.on('error', (err) => {
      reject(err);
    });

    doc.fontSize(18).text('Transaction History', { underline: true });
    doc.moveDown();

    transactions.forEach((transaction) => {
      doc.fontSize(13).text(`Title: ${transaction.title}`);
      doc.fontSize(12).text(`Amount: ${transaction.amount}`);
      doc.fontSize(12).text(`Date: ${new Date(transaction.createdAt).toLocaleDateString()}`);
      doc.fontSize(11).text(`Type: ${transaction.transactionType}`);
      doc.fontSize(12).text(`Description: ${transaction.descriptions}`);
      doc.moveDown();
    });

    doc.end();
  });
};

export const generatePDFController = catchAsync(async (req, res, next) => {
  const transactions = req.body.transactions;

  try {
    const pdfBuffer = await generatePDF(transactions);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.pdf');
    res.status(200).json({
      status: 'success',
      data: pdfBuffer.toString('base64') // Sending as base64 string
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    next(new AppError('Failed to generate PDF', 500));
  }
  
});
