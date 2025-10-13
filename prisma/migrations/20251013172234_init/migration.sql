/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `pointsEarned` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `earnedPoints` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "lineId" TEXT,
ADD COLUMN     "tier" TEXT NOT NULL DEFAULT 'Silver',
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "pointsEarned",
ADD COLUMN     "earnedPoints" INTEGER NOT NULL;
