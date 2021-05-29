-- CreateTable
CREATE TABLE `requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visiterId` VARCHAR(191) NOT NULL,
    `visitedId` VARCHAR(191) NOT NULL,
    `isPermit` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requests` ADD FOREIGN KEY (`visiterId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD FOREIGN KEY (`visitedId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
