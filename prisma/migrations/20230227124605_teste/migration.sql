-- CreateTable
CREATE TABLE `utilizador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `palavraPasse` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `utilizador` ENUM('PARTICIPANTE', 'ADMIN', 'ORGINZADOR') NOT NULL DEFAULT 'PARTICIPANTE',
    `telefone` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    UNIQUE INDEX `utilizador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `palestrante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `blog` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `hora` TIME NOT NULL,
    `dataInicio` DATE NOT NULL,
    `dataTermino` DATE NOT NULL,
    `utilizadorId` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bilhete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataTermino` DATETIME(3) NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `tipoEventoId` INTEGER NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Bilhete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `bilheteId` INTEGER NOT NULL,
    `compraId` INTEGER NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Palestrante_Evento` (
    `palestranteId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`palestranteId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orador_Evento` (
    `oradorId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`oradorId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoBilhete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `evento` ADD CONSTRAINT `evento_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evento` ADD CONSTRAINT `evento_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bilhete` ADD CONSTRAINT `bilhete_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bilhete` ADD CONSTRAINT `bilhete_tipoEventoId_fkey` FOREIGN KEY (`tipoEventoId`) REFERENCES `TipoBilhete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Bilhete` ADD CONSTRAINT `Item_Bilhete_bilheteId_fkey` FOREIGN KEY (`bilheteId`) REFERENCES `bilhete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Bilhete` ADD CONSTRAINT `Item_Bilhete_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Palestrante_Evento` ADD CONSTRAINT `Palestrante_Evento_palestranteId_fkey` FOREIGN KEY (`palestranteId`) REFERENCES `palestrante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Palestrante_Evento` ADD CONSTRAINT `Palestrante_Evento_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orador_Evento` ADD CONSTRAINT `Orador_Evento_oradorId_fkey` FOREIGN KEY (`oradorId`) REFERENCES `orador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orador_Evento` ADD CONSTRAINT `Orador_Evento_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
