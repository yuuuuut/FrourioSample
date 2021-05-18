/*
  Warnings:

  - Added the required column `due_date` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todos` ADD COLUMN `due_date` DATETIME(3) NOT NULL;
