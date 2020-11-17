const mysql = require("mysql");
const inquirer = require("inquirer");
const Etable = require("console.table");
const connection = require('./server');
userPrompt();

function userPrompt() {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to see or make changes?",
            name: "staff",
            choices: ["Staff Members", "Positions", "Departments", "View: Current Staff Records", "Current Department Records", "Current Position Records"]
        },
    ]).then((res) => {
        switch (res.staff) {
            case "Staff Members":
                StaffSelect()
                break
            case "Positions":
                PositionSelect()
                break
            case "Departments":
                DepartmentSelect()
                break
            // case "View: All Records":
            //     displayRecords()
            //     break
            case "View: Current Staff Records":
                displayStaffRecords()
                break
            case "Current Department Records":
                displayDepartmentRecords()
                break
            case "Current Position Records":
                displayJobRecords()
                break
            // case "Staff Removal Records":
            //     displayStaffRemovalRecords()
            //     break
            default:
                connection.end();
                process.exit(0);

        }
    })
};


function StaffSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "employees",
            choices: ["Add New Staff", "Make Updates", "Remove (choose if you have staff id)", "Back"]
        },
    ]).then((res) => {
        switch (res.employees) {
            case "Add New Staff":
                AddNewEmployee()
                break
            case "Make Updates":
                UpdateEmployee()
                break
            case "Remove (choose if you have staff id)":
                DeleteEmployee()
                break
            case "Back":
                userPrompt()
                break
        };
    });


    // this will need to be connected to sql AND be able to write/post new data.
    function AddNewEmployee() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your new hire's First Name?",
                name: "firstName"
            },

            {
                type: "input",
                message: "What is your new hire's Last Name?",
                name: "lastName"
            },
            // Below: OR is the value: "true"      value:"false"
            {
                type: "rawlist",
                message: "Is this person offically hired?",
                name: "status",
                choices: [{ name: "Yes", value: "Current" }, { name: "Soon To Start", value: "Pending" }]
            },

            {
                type: "rawlist",
                message: "What department were they assigned?",
                name: "assignedD",
                choices: [{ name: "Accounting", value: 1 }, { name: "Advertisement", value: 2 }, { name: "Client Services", value: 3 }, { name: "Creative Concepts", value: 4 }, { name: "HR", value: 5 }, { name: "Web Development", value: 6 }]

            },

            {
                type: "rawlist",
                message: "What position will they be assigned?",
                name: "jobTitle",
                choices: [{ name: "Head Accountant", value: 5 }, { name: "Intern", value: 6 }, { name: "Manager", value: 2 }, { name: "Project Lead", value: 3 }, { name: "Web Developer", value: 4 }]
            },

            {
                type: "rawlist",
                message: "What Manager Will They Report To?",
                name: "managerId",
                choices: [{ name: "Jack Johnson", value: 5 }, { name: "Kelsea Ballerini", value: 4 }, { name: "Mandy Yorkson", value: 1 }, { name: "Jackson Dunn", value: 2 }, { name: "Tirzah Ericson", value: 7 }, { name: "Scott James", value: 6 }, { name: "Tiffany Sunberg", value: 3 }]
            },
        ]).then(function (res) {

            connection.query("INSERT INTO staff_members(first_name, last_name, status, department_id, job_id, managerId )  VALUE (?, ?, ?, ?, ?, ?);", [res.firstName, res.lastName, res.status, res.assignedD, res.jobTitle, res.managerId], (err, res) => {
                userPrompt();
                if (err) throw err;
            })
            return console.table(res), console.log("New Staff Member Saved.");


        });
    };

    // this will need to be connected to sql AND be changeable.
    function UpdateEmployee() {
        // inquirer.prompt([
        //     {
        //         type: "input",
        //         message: "Please enter the staff id or first and last name?",
        //         name: "updateStaff"
        //     },
        // ]).then(function (res) {
        //     return console.log(res.updateStaff + "'s profile has been updated")
        // })
        return console.log("Currently Under Maintenance. Please, check back later. Sorry for any inconvenience.");
    }


    function DeleteEmployee() {

        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the staff member id:",
                name: "deleteStaff"

            },

            // {
            //     type: "rawlist",
            //     message: "What were the circumstances of the dismissal?",
            //     choices: ["Voluntary", "Administrative"],
            //     name: "circumstance"
            // },

            // {
            //     type: "input",
            //     message: "Please enter a brief reason for dismissal and documents available for review?",
            //     name: "reasons",
            //     when: function (answers) { return answers.circumstance !== "Voluntary" }
            // },
        ]).then(function (res) {
            connection.query("DELETE FROM staff_members WHERE id = (?);", [res.deleteStaff], (err, res) => {
                userPrompt();
                if (err) throw err;
            })
            return console.table(res);
        })

    }
};

function PositionSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "position",
            choices: ["Add New Position", "Make Updates", "Remove Position (choose if you have position id)", "Back"]
        },
    ]).then((res) => {
        switch (res.position) {
            case "Add New Position":
                AddNewPosition()
                break
            case "Make Updates":
                UpdatePosition()
                break
            case "Remove Position (choose if you have position id)":
                DeletePosition()
                break
            case "Back":
                userPrompt()
                break
        };
    });



    function AddNewPosition() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your new Position Title?",
                name: "addPtitle"
            },

            {
                type: "input",
                message: "Enter the yearly salary? Example: '75000'",
                name: "salary"
            },

            {
                type: "input",
                message: "What will be the position's requirements and expectations?",
                name: "reqExp"
            },

            {
                type: "rawlist",
                message: "What department will this position be assigned?",
                name: "assignedP",
                choices: [{ name: "Accounting", value: 7 }, { name: "Administration", value: 1 }, { name: "Advertisement", value: 2 }, { name: "Client Services", value: 3 }, { name: "Creative Concepts", value: 4 }, { name: "HR", value: 5 }, { name: "Web Development", value: 6 }]
            },


        ]).then(function (res) {
            connection.query("INSERT INTO jobTitle(name, salary, Description, department_id) VALUE (?, ?, ?, ?);", [res.addPtitle, res.salary, res.reqExp, res.assignedP], (err, result) => {
                userPrompt();
                if (err) throw err;
            })
            return console.table(res);

        });
    };

    // this will need to be connected to sql AND be changeable.
    function UpdatePosition() {
        //     inquirer.prompt([
        //         {
        //             type: "input",
        //             message: "Please enter the current position title you wish to change:",
        //             name: "currentPosition"
        //         },

        //         {
        //             type: "rawlist",
        //             message: "What do you wish to update?",
        //             choices: ["Title", "Salary", "Requirements and Expectations", "Department"],
        //             name: "updateSelectP"
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new position title:",
        //             name: "updatePosition",
        //             when: function (answers) { return answers.updateSelectP === "Title" }
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new yearly position salary:",
        //             name: "updateSalary",
        //             when: function (answers) { return answers.updateSelectP === "Salary" }
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new requirements and expectations:",
        //             name: "updateReqExp",
        //             when: function (answers) { return answers.updateSelectP === "Requirements and Expectations" }
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new department of the position:",
        //             name: "updateDepartmentP",
        //             when: function (answers) { return answers.updateSelectP === "Department" }
        //         },
        //     ]).then(function (res) {
        //         return console.log("The position profile has been updated");
        //     });
        return console.log("Currently Under Maintenance. Please, check back later. Sorry for any inconvenience.");
    };

    // this will need to be connected to sql AND be removeable.
    function DeletePosition() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please the Department id you wish to remove:",
                name: "deletePosition"
            },
        ]).then(function (res) {
            connection.query("DELETE FROM jobTitle WHERE id = (?);", [res.deletePosition], (err, res) => {
                console.table(res);
                userPrompt();
                if (err) throw err;
            })
            return console.table(res)
        })
        if (err) throw err;
    }
};




// ADD, UPDATE and DELETE

function DepartmentSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "departments",
            choices: ["Add New Department", "Make Updates", "Close Department (choose if you have position id)", "Back"]
        },
    ]).then((res) => {
        switch (res.departments) {
            case "Add New Department":
                AddNewDepartment()
                break
            case "Make Updates":
                UpdateDepartment()
                break
            case "Close Department (choose if you have position id)":
                DeleteDepartment()
                break
            case "Back":
                userPrompt()
                break
        };
    });

    function AddNewDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your new Department Title?",
                name: "addDtitle"
            },

            {
                type: "input",
                message: "How many staff members will it require?",
                name: "staffCount"
            },

            {
                type: "input",
                message: "What will be the responsibilities of the new department? Write brief description:",
                name: "description"
            },
        ]).then(function (res) {
            connection.query("INSERT INTO department(name, number_of_staff, Description)  VALUE (?, ?, ?);", [res.addDtitle, res.staffCount, res.description], (err, result) => {
                console.table(result);
                userPrompt();
                if (err) throw err;
            })
            return console.log("New Department Saved.");

        });
    };


    // UPDATE under constrution.

    function UpdateDepartment() {
        //     inquirer.prompt([
        //         {
        //             type: "rawlist",
        //             message: "Please enter the current department title you wish to change:",
        //             name: "currentDepartment",
        //             choices: [{ name: "Accounting", value: 1 }, { name: "Advertisement", value: 2 }, { name: "Client Services", value: 3 }, { name: "Creative Concepts", value: 4 }, { name: "HR", value: 5 }, { name: "Web Development", value: 6 }]
        //         },

        //         {
        //             type: "rawlist",
        //             message: "What do you wish to update?",
        //             choices: ["Title", "Description", "Staff Count"],
        //             name: "updateSelectD"
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new position title:",
        //             name: "updateTitle",
        //             when: function (answers) { return answers.updateSelectD === "Title" }
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the the new responsibilities of the department:",
        //             name: "updateDescription",
        //             when: function (answers) { return answers.updateSelectD === "Description" }
        //         },

        //         {
        //             type: "input",
        //             message: "Please enter the new amount of staff members needed:",
        //             name: "updateStaffCount",
        //             when: function (answers) { return answers.updateSelectD === "Staff Count" }
        //         },

        //     ]).then(function (res) {
        //         return console.log("The department profile has been updated");
        //     });

        return console.log("Currently Under Maintenance. Please, check back later. Sorry for any inconvenience.");
    };


    function DeleteDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the department id you wish to delete:",
                name: "deleteDepartment"

            }
        ]).then(function (res) {

            connection.query("DELETE FROM department WHERE id = (?);", [res.deleteDepartment], (err, res) => {
                userPrompt();
                if (err) throw err;
            })
        })
        return console.table(res);

    }
};

// function displayRecords() {
//     // FULL join????
//     connection.query("SELECT * FROM staff_members, department, jobTitle, staff_removals;", function (err, res) {
//         console.table(res);
//         userPrompt();
//         if (err)
//             throw err
//     });

// };


function displayStaffRecords() {
    connection.query("SELECT * FROM staff_members;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userPrompt();
    });
};

function displayDepartmentRecords() {
    connection.query("SELECT * FROM department;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });
};

function displayJobRecords() {
    connection.query("SELECT * FROM jobTitle;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });
};

// function displayStaffRemovalRecords() {
//     connection.query("SELECT * FROM removals;", function (err, res) {
//         console.table(res);
//         userPrompt();
//         if (err)
//             throw err
//     });
// }












module.exports = "./dataEntry.js"