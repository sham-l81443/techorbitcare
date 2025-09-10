/*
  Warnings:

  - You are about to drop the `business_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact_submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repair_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repair_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."repair_items" DROP CONSTRAINT "repair_items_repairRequestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."repair_requests" DROP CONSTRAINT "repair_requests_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_repairRequestId_fkey";

-- DropTable
DROP TABLE "public"."business_settings";

-- DropTable
DROP TABLE "public"."contact_submissions";

-- DropTable
DROP TABLE "public"."repair_items";

-- DropTable
DROP TABLE "public"."repair_requests";

-- DropTable
DROP TABLE "public"."reviews";

-- DropTable
DROP TABLE "public"."services";

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."RepairIssueType";

-- DropEnum
DROP TYPE "public"."RepairPriority";

-- DropEnum
DROP TYPE "public"."RepairStatus";
