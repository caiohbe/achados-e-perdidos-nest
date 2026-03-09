-- CreateTable
CREATE TABLE `locais_senai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_cpf_key`(`cpf`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `entregue` BOOLEAN NOT NULL,
    `data_encontrado` DATETIME(3) NULL,
    `local_encontrado_id` INTEGER NOT NULL,
    `usuario_devolvido_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `achados` ADD CONSTRAINT `achados_local_encontrado_id_fkey` FOREIGN KEY (`local_encontrado_id`) REFERENCES `locais_senai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achados` ADD CONSTRAINT `achados_usuario_devolvido_id_fkey` FOREIGN KEY (`usuario_devolvido_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
