/*
  Warnings:

  - You are about to drop the column `store_name` on the `Store` table. All the data in the column will be lost.
  - Added the required column `address` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeName` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "store_name",
ADD COLUMN     "address" VARCHAR(225) NOT NULL,
ADD COLUMN     "storeName" VARCHAR(225) NOT NULL;
