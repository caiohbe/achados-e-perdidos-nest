/*
  Warnings:

  - You are about to drop the `achados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `achados` DROP FOREIGN KEY `achados_local_encontrado_id_fkey`;

-- DropForeignKey
ALTER TABLE `achados` DROP FOREIGN KEY `achados_usuario_devolvido_id_fkey`;

-- DropTable
DROP TABLE `achados`;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagem_URL` VARCHAR(191) NOT NULL,
    `data_encontrado` DATETIME(3) NULL,
    `local_encontrado_id` INTEGER NOT NULL,
    `usuario_devolvido_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_local_encontrado_id_fkey` FOREIGN KEY (`local_encontrado_id`) REFERENCES `locais_senai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_usuario_devolvido_id_fkey` FOREIGN KEY (`usuario_devolvido_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
