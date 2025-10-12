/*
  Warnings:

  - You are about to drop the column `userId` on the `LoyaltyPoint` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `LoyaltyPoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."LoyaltyPoint" DROP CONSTRAINT "LoyaltyPoint_userId_fkey";

-- AlterTable
ALTER TABLE "LoyaltyPoint" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "LoyaltyPoint" ADD CONSTRAINT "LoyaltyPoint_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
