-- AlterTable
ALTER TABLE `Image` MODIFY `url` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NULL,
    MODIFY `rate` DOUBLE NULL;
