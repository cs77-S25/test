/*
  Warnings:

  - You are about to drop the column `owerid` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `owerid` on the `Docs` table. All the data in the column will be lost.
  - Added the required column `ownerid` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerid` to the `Docs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_owerid_fkey";

-- DropForeignKey
ALTER TABLE "Docs" DROP CONSTRAINT "Docs_owerid_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "owerid",
ADD COLUMN     "ownerid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Docs" DROP COLUMN "owerid",
ADD COLUMN     "ownerid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
