DROP DATABASE IF EXISTS staff_db;

CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE jobTitle(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(40),
    salary INTEGER NOT NULL,
    PRIMARY KEY(id),

    FOREIGN KEY(department_id) REFERENCES department(id)
);


CREATE TABLE department(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(40),
    department_id INTEGER NOT NULL,

    PRIMARY KEY(id),
);

CREATE TABLE staff_members(
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    department VARCHAR(40)NOT NULL,
    position VARCHAR(40) NOT NULL,
    salary INTEGER NOT NULL,
    managerId INTEGER, NULL,
    
    PRIMARY KEY(id),
);

INSERT INTO department(name)
VALUE ("Website Development");

INSERT INTO department(name)
VALUE ("Accounting");

INSERT INTO department(name)
VALUE ("Customer Service");

INSERT INTO department(name)
VALUE ("HR");

INSERT INTO department(name)
VALUE ("Creative Concepts");

SELECT * FROM staff_members;

