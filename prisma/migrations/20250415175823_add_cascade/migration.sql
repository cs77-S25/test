-- DropForeignKey
ALTER TABLE "Docs" DROP CONSTRAINT "Docs_boardid_fkey";

-- DropForeignKey
ALTER TABLE "Docs" DROP CONSTRAINT "Docs_ownerid_fkey";

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_boardid_fkey" FOREIGN KEY ("boardid") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
