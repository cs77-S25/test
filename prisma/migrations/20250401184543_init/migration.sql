/*
  Warnings:

  - You are about to drop the column `text` on the `Board` table. All the data in the column will be lost.
  - Added the required column `description` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Docs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "owerid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_shareddocs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_shareddocs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_shareddocs_B_index" ON "_shareddocs"("B");

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_owerid_fkey" FOREIGN KEY ("owerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shareddocs" ADD CONSTRAINT "_shareddocs_A_fkey" FOREIGN KEY ("A") REFERENCES "Docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shareddocs" ADD CONSTRAINT "_shareddocs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
