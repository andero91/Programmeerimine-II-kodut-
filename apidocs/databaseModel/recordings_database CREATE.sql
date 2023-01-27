-- -----------------------------------------------------
-- Schema recordings_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema recordings_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `recordings_database` DEFAULT CHARACTER SET utf8 ;
USE `recordings_database` ;

-- -----------------------------------------------------
-- Table `recordings_database`.`Artists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`Artists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recordings_database`.`RecordCompanies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`RecordCompanies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recordings_database`.`ReleaseTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`ReleaseTypes` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recordings_database`.`Releases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`Releases` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artistID` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` INT NOT NULL,
  `releaseDate` DATE NOT NULL,
  `recordCompanyID` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`artistID` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `id_idx1` (`type` ASC) VISIBLE,
  INDEX `id_idx2` (`recordCompanyID` ASC) VISIBLE,
  CONSTRAINT `id`
    FOREIGN KEY (`artistID`)
    REFERENCES `recordings_database`.`Artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id2`
    FOREIGN KEY (`type`)
    REFERENCES `recordings_database`.`ReleaseTypes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id3`
    FOREIGN KEY (`recordCompanyID`)
    REFERENCES `recordings_database`.`RecordCompanies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recordings_database`.`Tracks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`Tracks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artistID` INT NOT NULL,
  `releaseID` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`artistID` ASC) VISIBLE,
  INDEX `id_idx1` (`releaseID` ASC) VISIBLE,
  CONSTRAINT `id4`
    FOREIGN KEY (`artistID`)
    REFERENCES `recordings_database`.`Artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id5`
    FOREIGN KEY (`releaseID`)
    REFERENCES `recordings_database`.`Releases` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recordings_database`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recordings_database`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;