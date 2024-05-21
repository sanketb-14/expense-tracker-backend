import dynamic from 'next/dynamic';
import { useTrans } from "../contexts/TransactionsContext";
const GenreatePdf = () => {
  const { transactions } = useTrans();

  const generatePDF = dynamic(
    () => import('../utils/pdfGenerator'),
    { ssr: false }
  );

  const handleGeneratePDF = () => {
    const stream = generatePDF(transactions);

    // Optionally, you can prompt the user to download the file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(
      new Blob([stream.toPdf().end()], { type: "application/pdf" })
    );
    downloadLink.download = "transactions.pdf";
    downloadLink.click();
  };
  return <button onClick={handleGeneratePDF}className="btn btn-sm btn-accent">Download PDF</button>;
};

export default GenreatePdf;
