-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "transactionType" SET DEFAULT 'debit';
