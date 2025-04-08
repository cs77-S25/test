/*
  Warnings:

  - Added the required column `boardid` to the `Docs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Docs" ADD COLUMN     "boardid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_boardid_fkey" FOREIGN KEY ("boardid") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
