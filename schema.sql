
-- Create db
DROP DATABASE IF EXISTS staff_db;

CREATE DATABASE staff_db;

USE staff_db;

-- Create department table 
CREATE TABLE department(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(40),
    number_of_staff INTEGER NOT NULL,
    Description VARCHAR(200),
    PRIMARY KEY(id)
    );
    
    -- Create Positions table with jobTitle name since "roles" and "positons" names were rejected be mysql.
    CREATE TABLE jobTitle(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(40),
    salary INTEGER NULL,
    Description VARCHAR(200),
    department_id INTEGER NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
    );
 
--  Create Staff Members Table
   CREATE TABLE staff_members(
    id INTEGER AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    status VARCHAR(200) NOT NULL, 
    department_id INTEGER NULL,
    job_id INTEGER NOT NULL,
    managerId INTEGER NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id),
    CONSTRAINT fk_jobTitle FOREIGN KEY(job_id) REFERENCES jobTitle(id)
    );
       
    -- Create Staff Removals Table
    -- CREATE TABLE staff_removals(
    -- id INTEGER AUTO_INCREMENT NOT NULL,
    -- first_name VARCHAR(40) NOT NULL,
    -- last_name VARCHAR(40) NOT NULL,
    -- status VARCHAR(200) NULL, 
    -- department_id INTEGER NULL,
    -- job_id INTEGER NOT NULL,
    -- managerId INTEGER NULL,
    -- Removal_Circumstances varchar(25),
    -- Removal_Description_Docs VARCHAR(200),
    -- PRIMARY KEY(id),
    -- FOREIGN KEY(department_id) REFERENCES department(id)
    -- );
    

SELECT * FROM staff_removals AS removals;

SELECT * FROM staff_members AS staff
LEFT JOIN department AS depart ON staff.department_id = depart.id;

SELECT * FROM staff_members AS staff
LEFT JOIN jobTitle AS job ON staff.job_id = job.id;

SELECT * FROM jobTitle AS job
LEFT JOIN department AS depart ON job.department_id = depart.id;

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (6, "Website Development", 375, "Responsible for: the development of new technical innovations from Creative Concepts.");

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (1, "Accounting", 250, "Responsible for: cost containment and taxes.");

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (2, "Advertisment", 300, "Responsible for: advertisment in all forms of media.");

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (3, "Client Services", 500, "Responsible for: customer satisfaction and customer conflict resolution.");

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (5, "HR", 700, "Responsible for: conflict resolution among staff members and disiplinary acts.");

INSERT INTO department(id, name, number_of_staff, Description)
VALUE (4, "Creative Concepts", 350, "Responsible for: creating innovative concepts for everything relating to the customer or client.");



INSERT INTO jobTitle(id, name, salary, Description)
VALUE (2, "Manager", 85000, "Must be with the company for one year minimum, Must have 5 years experience in field of managment.");

INSERT INTO jobTitle(id, name, salary, Description)
VALUE (3, "Project Lead", 75000, "Must have successfully completed projects in a group setting. Must be a good communicator.");

INSERT INTO jobTitle(id, name, salary, Description)
VALUE (4, "Web Developer", 65000, "Must have 3 years experience minimum, Must be familiar with Python and Java.");

INSERT INTO jobTitle(id, name, salary, Description)
VALUE (5, "Head Accountant", 55000, "Must be with the company for one year minimum, Must have 5 years experience in field of tax prep, law and conservation methods.");

INSERT INTO jobTitle(id, name, salary, Description)
VALUE (6, "Intern", 25000, "Must maintain a GPA of 3.0 or higher and be willing to learn new programming languages.");

INSERT INTO jobTitle(id, name, salary, Description)
VALUE (1, "CEO", NULL, "Owner and runner of company.");
