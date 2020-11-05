const mysql = require("mysql");
const inquirer = require("inquirer");
const Etable = require("console.table");
userPrompt();

function userPrompt() {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to see or make changes?",
            name: "staff",
            choices: ["Staff Members", "Positions", "Departments", "View Records"]
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
            case "Display Records":
                displayRecords()
                break
            // default:
            //     connection.end();
            //     process.exit(0);
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

            {
                type: "rawlist",
                message: "What department were they assigned?",
                name: "assignedD",
                choices: ["Accounting", "Advertisement", "Client Services", "Creative Concepts", "HR", "Legal", "Software Testing"]
            },

            {
                type: "input",
                message: "What position will they be assigned?",
                name: "jobTitle"
            },
        ]).then(function (res) {
            return console.log("New Staff Member Saved.");
            
        });
    };

    // this will need to be connected to sql AND be changeable.
    function UpdateEmployee(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the staff id or first and last name?",
                name: "updateStaff"
            },
        ]).then(function (res){
            return console.log(res.updateStaff +"'s profile has been updated")
        })
    }

// this will need to be connected to sql AND be removeable.
    function DeleteEmployee(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the staff id or first and last name?",
                name: "deleteStaff"
            },

            {
                type: "rawlist",
                message: "What were the circumstances of the dismissal?",
                choices:["Voluntary", "Administrative"],
                name: "circumstance"
            },

            {
                type: "input",
                message: "Please enter a brief reason for dismissal and documents available for review?",
                name: "reasons",
                when: function(answers){ return answers.circumstance !== "Voluntary"}
            },
        ]).then(function (res){
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
                choices: ["Accounting", "Advertisement", "Client Services", "Creative Concepts", "HR", "Legal", "Software Testing"]
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
    function UpdatePosition(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the current position title you wish to change:",
                name: "currentPosition"
            },

            {
                type: "rawlist",
                message: "What do you wish to update?",
                choices:["Title", "Salary", "Requirements and Expectations", "Department"],
                name: "updateSelectP"
            },

            {
                type: "input",
                message: "Please enter the new position title:",
                name: "updatePosition",
                when: function(answers){return answers.updateSelectP === "Title"}
            },

            {
                type: "input",
                message: "Please enter the new yearly position salary:",
                name: "updateSalary",
                when: function(answers){return answers.updateSelectP === "Salary"}
            },

            {
                type: "input",
                message: "Please enter the new requirements and expectations:",
                name: "updateReqExp",
                when: function(answers){return answers.updateSelectP === "Requirements and Expectations"}
            },

            {
                type: "input",
                message: "Please enter the new department of the position:",
                name: "updateDepartmentP",
                when: function(answers){return answers.updateSelectP === "Department"}
            },
        ]).then(function (res){
            return console.log("The position profile has been updated");
        });
    };

// this will need to be connected to sql AND be removeable.
    function DeletePosition(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the position that you wish to delete:",
                name: "deletePosition"
            },
        ]).then(function (res){
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
            choices: ["Add New Department", "Make Updates", "Remove"]
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
                choices: ["Accounting", "Advertisement", "Client Services", "Creative Concepts", "HR", "Legal", "Software Testing"]
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
    function UpdatePosition(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the current position title you wish to change:",
                name: "currentPosition"
            },

            {
                type: "rawlist",
                message: "What do you wish to update?",
                choices:["Title", "Salary", "Requirements and Expectations", "Department"],
                name: "updateSelectP"
            },

            {
                type: "input",
                message: "Please enter the new position title:",
                name: "updatePosition",
                when: function(answers){return answers.updateSelectP === "Title"}
            },

            {
                type: "input",
                message: "Please enter the new yearly position salary:",
                name: "updateSalary",
                when: function(answers){return answers.updateSelectP === "Salary"}
            },

            {
                type: "input",
                message: "Please enter the new requirements and expectations:",
                name: "updateReqExp",
                when: function(answers){return answers.updateSelectP === "Requirements and Expectations"}
            },

            {
                type: "input",
                message: "Please enter the new department of the position:",
                name: "updateDepartmentP",
                when: function(answers){return answers.updateSelectP === "Department"}
            },
        ]).then(function (res){
            return console.log("The department profile has been updated");
        });
    };

// this will need to be connected to sql AND be removeable.
    function DeleteDepartment(){
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the department that you wish to delete:",
                name: "deleteDepartment"
            },
        ]).then(function (res){
            return console.log(res.deleteDepartment + " has been removed")
        })
        if (err) throw err;
    }
    if (err) throw err;
};

function displayRecords() {
    console.log("directory works.");
    if (err) throw err;
};














module.exports = "./dataEntry.js"