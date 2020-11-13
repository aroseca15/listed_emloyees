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
            choices: ["Staff Members", "Positions", "Departments", "View: All Records", "Current Staff Records", "Current Department Records", "Current Position Records", "Staff Removal Records"]
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
            case "View: All Records":
                displayRecords()
                break
            case "Current Staff Records":
                displayStaffRecords()
                break
            case "Current Department Records":
                displayDepartmentRecords()
                break
            case "Current Position Records":
                displayJobRecords()
                break
            case "Staff Removal Records":
                displayStaffRemovalRecords()
                break
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
            choices: ["Add New Staff", "Make Updates", "Remove", "Back"]
        },
    ]).then((res) => {
        switch (res.employees) {
            case "Add New Staff":
                AddNewEmployee()
                break
            case "Make Updates":
                UpdateEmployee()
                break
            case "Remove":
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
                name: "deleteStaff",
                choices: [{ name: "Jack Johnson", value: 2 }, { name: "Kelsea Ballerini", value: 4 }, { name: "Jackson Dunn", value: 6 }, { name: "Tirzah Ericson", value: 7 }, { name: "Scott James", value: 8 }, { name: "Tiffany Sunberg", value: 9 }]
            },
        ]).then(function (res) {
            connection.query("INSERT INTO staff_members(first_name, last_name, status, department_id, job_id, managerId )  VALUE (?, ?, ?, ?, ?, ?);", [res.firstName, res.lastName, res.status, res.assignedD, res.jobTitle, res.managerId], (err, result)=>{
                
                console.table(result);
                // return console.log("New Staff Member Saved.");
                userPrompt();
            if (err) throw err;
            })
    
            

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

    // this will need to be connected to sql AND be removeable.
    function DeleteEmployee() {
        inquirer.prompt([
            {
                type: "rawlist",
                message: "Please choose the staff member you wish to remove?",
                name: "deleteStaff",
                choices: [{ name: "Jack Johnson", value: 2 }, { name: "Colbie Caliet", value: 3 }, { name: "Kelsea Ballerini", value: 4 }, { name: "Ray Benson", value: 5 }, { name: "Han Solo", value: 6 }]
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
            return console.log(res.deleteStaff + " has been removed")
        })

    }
    if (err) throw err;
};


function PositionSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "position",
            choices: ["Add New Position", "Make Updates", "Remove Position", "Back"]
        },
    ]).then((res) => {
        switch (res.position) {
            case "Add New Position":
                AddNewPosition()
                break
            case "Make Updates":
                UpdatePosition()
                break
            case "Remove Position":
                DeletePosition()
                break
            case "Back":
                userPrompt()
                break
        };
    });


    // this will need to be connected to sql AND be able to write/post new data.
    function AddNewPosition() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your new Position Title?",
                name: "addPtitle"
            },

            {
                type: "input",
                message: "Enter the yearly salary?",
                name: "salary"
            },

            {
                type: "rawlist",
                message: "What department will this position be assigned?",
                name: "assignedP",
                choices: [{ name: "Accounting", value: 1 }, { name: "Advertisement", value: 2 }, { name: "Client Services", value: 3 }, { name: "Creative Concepts", value: 4 }, { name: "HR", value: 5 }, { name: "Web Development", value: 6 }]
            },

            {
                type: "input",
                message: "What will be the position's requirements and expectations?",
                name: "reqExp"
            },
        ]).then(function (res) {
            return console.log("New Position Saved.");

        });
    };

    // this will need to be connected to sql AND be changeable.
    // function UpdatePosition() {
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
    // };

    // this will need to be connected to sql AND be removeable.
    function DeletePosition() {
        inquirer.prompt([
            {
                type: "rawlist",
                message: "Please choose the position that you wish to delete:",
                name: "deletePosition",
                choices: [{ name: "Head Accountant", value: 5 }, { name: "Intern", value: 6 }, { name: "Manager", value: 2 }, { name: "Project Lead", value: 3 }, { name: "Web Developer", value: 4 }]
            },
        ]).then(function (res) {
            return console.log(res.deletePosition + " has been removed")
        })
        if (err) throw err;
    }
};






function DepartmentSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "departments",
            choices: ["Add New Department", "Make Updates", "Close Department", "Back"]
        },
    ]).then((res) => {
        switch (res.departments) {
            case "Add New Department":
                AddNewDepartment()
                break
            case "Make Updates":
                UpdateDepartment()
                break
            case "Close Department":
                DeleteDepartment()
                break
            case "Back":
                userPrompt()
                break
        };
    });


    // this will need to be connected to sql AND be able to write/post new data.
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
            return console.log("New Department Saved.");

        });
    };

    // this will need to be connected to sql AND be changeable.
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

    // this will need to be connected to sql AND be removeable.
    function DeleteDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the department that you wish to delete:",
                name: "deleteDepartment",
                choices: [{ name: "Accounting", value: 1 }, { name: "Advertisement", value: 2 }, { name: "Client Services", value: 3 }, { name: "Creative Concepts", value: 4 }, { name: "HR", value: 5 }, { name: "Web Development", value: 6 }]
        ]).then(function (res) {
            return console.log(res.deleteDepartment + " has been removed")
            if (err)
            throw err
        })
        if (err) throw err;
    }
    if (err) throw err;
};

function displayRecords() {
    // FULL join????
    connection.query("SELECT * FROM staff, depart, job, removals;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });

};

function displayStaffRecords() {
    connection.query("SELECT * FROM staff;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userPrompt();
    });
};

function displayDepartmentRecords() {
    connection.query("SELECT * FROM depart;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });
};

function displayJobRecords() {
    connection.query("SELECT * FROM job;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });
};

function displayStaffRemovalRecords() {
    connection.query("SELECT * FROM removals;", function (err, res) {
        console.table(res);
        userPrompt();
        if (err)
            throw err
    });
}












module.exports = "./dataEntry.js"