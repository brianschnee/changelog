/*
  Warnings:

  - You are about to drop the `UpdatePoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UpdatePoint" DROP CONSTRAINT "UpdatePoint_updateId_fkey";

-- DropTable
DROP TABLE "UpdatePoint";

-- CreateTable
CREATE TABLE "BulletPoint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "updateId" TEXT NOT NULL,

    CONSTRAINT "BulletPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BulletPoint" ADD CONSTRAINT "BulletPoint_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "Update"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
