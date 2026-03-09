/*
  Warnings:

  - Made the column `data_encontrado` on table `achados` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `achados` DROP FOREIGN KEY `achados_usuario_devolvido_id_fkey`;

-- DropIndex
DROP INDEX `achados_usuario_devolvido_id_fkey` ON `achados`;

-- AlterTable
ALTER TABLE `achados` ADD COLUMN `data_devolvido` DATETIME(3) NULL,
    MODIFY `data_encontrado` DATETIME(3) NOT NULL,
    MODIFY `usuario_devolvido_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `achados` ADD CONSTRAINT `achados_usuario_devolvido_id_fkey` FOREIGN KEY (`usuario_devolvido_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
