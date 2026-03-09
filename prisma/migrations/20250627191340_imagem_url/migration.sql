/*
  Warnings:

  - You are about to drop the column `imagem` on the `achados` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `locais_senai` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagem_URL` to the `achados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `achados` DROP COLUMN `imagem`,
    ADD COLUMN `imagem_URL` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `locais_senai_nome_key` ON `locais_senai`(`nome`);
