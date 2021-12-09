CREATE SCHEMA IF NOT EXISTS homeworkApi;
USE homeworkApi;
CREATE TABLE IF NOT EXISTS `homeworkApi`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
  
  CREATE TABLE IF NOT EXISTS `homeworkApi`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_courses_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_courses_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `homeworkApi`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `homeworkApi`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `courses_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_subjects_courses_idx` (`courses_id` ASC) VISIBLE,
  CONSTRAINT `fk_subjects_courses`
    FOREIGN KEY (`courses_id`)
    REFERENCES `homeworkApi`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `homeworkApi`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rooms_subjects_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_rooms_subjects`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `homeworkApi`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `homeworkApi`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teachers_subjects_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_teachers_subjects`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `homeworkApi`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO users(firstName, lastName, email, password, role) VALUES
  ('Taaniel', 'Admin', 'taaniel@gmail.com', '$2b$10$cV1PqES2oHTrRDtXDRY6oea.4nV3Xk1Z2XSuIKJozzreNEhKwPOm2', 'Admin'),
  ('Juhan', 'Juut', 'juut@gmail.com', '$2b$10$qAJqawR4Bk6pp6JlhK/EbuzivRxJgsrm52M/d/zqKxyfRdks6qDpi', 'User');
INSERT INTO courses(name, users_id) VALUES
  ('RIF I', 1),
  ('LO 2', 2);
INSERT INTO subjects(name, courses_id) VALUES
  ('Andmebaasid (HKI5012.HK)', 1),
  ('Dietoloogia (HKT5051.HK)', 2);
INSERT INTO rooms(number, subjects_id) VALUES
  (201, 1),
  (301, 2);
INSERT INTO teachers(firstName, lastName, subjects_id) VALUES
  ('Priidu', 'Paomets', 1),
  ('Elmar', 'Mets', 2);
