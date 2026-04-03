/*
  Warnings:

  - You are about to drop the column `userId` on the `Cafe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cafe" DROP CONSTRAINT "Cafe_userId_fkey";

-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "userId";
