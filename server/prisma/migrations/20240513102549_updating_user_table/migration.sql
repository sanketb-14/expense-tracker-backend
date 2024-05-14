-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordChangedAt" DROP DEFAULT,
ALTER COLUMN "passwordResetToken" DROP NOT NULL;
