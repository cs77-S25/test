-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_ownerid_fkey";

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
