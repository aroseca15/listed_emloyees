DROP DATABASE IF EXISTS staff_db;

CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE staff_members(
    NAME VARCHAR (40) NOT NULL,
    id INTEGER AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
);

INSERT INTO staff_members (name,id)
VALUES ("Johnson", 2);