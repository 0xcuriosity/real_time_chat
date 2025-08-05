/*
  Warnings:

  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "avatarUrl" DROP NOT NULL;
