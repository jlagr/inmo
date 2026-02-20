/*
  Warnings:

  - You are about to drop the column `municipio` on the `properties` table. All the data in the column will be lost.
  - Added the required column `county` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "municipio",
ADD COLUMN     "county" VARCHAR(100) NOT NULL;
