-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_adminId_fkey";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
