-- CreateTable
CREATE TABLE `utilizador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `palavraPasse` VARCHAR(191) NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `utilizador` ENUM('PARTICIPANTE', 'ADMIN', 'ORGANIZADOR') NOT NULL DEFAULT 'PARTICIPANTE',
    `telefone` VARCHAR(191) NOT NULL,
    `verificado` BOOLEAN NOT NULL DEFAULT false,
    `banido` BOOLEAN NOT NULL DEFAULT false,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    UNIQUE INDEX `utilizador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `palestrante` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `blog` VARCHAR(191) NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `estado` ENUM('CANCELADO', 'DESPONIVEL', 'ADECORRER', 'FINALIZADO') NOT NULL DEFAULT 'DESPONIVEL',
    `descricao` VARCHAR(8000) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `horaInicio` TIME NOT NULL,
    `horaTermino` TIME NOT NULL,
    `dataInicio` DATE NOT NULL,
    `dataTermino` DATE NOT NULL,
    `publicado` BOOLEAN NOT NULL DEFAULT false,
    `aprovado` BOOLEAN NOT NULL DEFAULT false,
    `banido` BOOLEAN NOT NULL DEFAULT false,
    `utilizadorId` VARCHAR(191) NOT NULL,
    `categoriaId` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bilhete` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `preco` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `horaInicio` TIME NOT NULL,
    `horaTermino` TIME NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataTermino` DATETIME(3) NOT NULL,
    `eventoId` VARCHAR(191) NOT NULL,
    `tipoEventoId` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Bilhete` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `bilheteId` VARCHAR(191) NOT NULL,
    `compraId` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Palestrante_Evento` (
    `palestranteId` VARCHAR(191) NOT NULL,
    `eventoId` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`palestranteId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orador_Evento` (
    `oradorId` VARCHAR(191) NOT NULL,
    `eventoId` VARCHAR(191) NOT NULL,
    `at_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `at_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`oradorId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoBilhete` (
    `id` VARCHAR(191) NOT NULL,
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
