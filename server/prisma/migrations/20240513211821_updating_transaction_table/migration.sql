/*
  Warnings:

  - A unique constraint covering the columns `[categories]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_categories_key" ON "Category"("categories");
