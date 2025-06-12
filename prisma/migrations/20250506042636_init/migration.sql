/*
  Warnings:

  - You are about to drop the column `provincyId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `provincyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Provincy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `provinceId` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provincyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_provincyId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "provincyId",
ADD COLUMN     "provinceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "provincyId",
ADD COLUMN     "provinceId" TEXT;

-- DropTable
DROP TABLE "Provincy";

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "provinceName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
