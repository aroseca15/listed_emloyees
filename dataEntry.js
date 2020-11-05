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
    if (err) throw err;
};

function PositionSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "position",
            choices: ["Add New Position", "Make Updates", "Remove Position"]
        },
    ]).then();
    console.log("direction works.");
    if (err) throw err;
};

function DepartmentSelect(res, err) {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "What would you like to change?",
            name: "departments",
            choices: ["Add New Department", "Make Updates", "Remove"]
        },
    ]).then();
    console.log("direction works.");
    if (err) throw err;
};

function displayRecords() {
    console.log("directory works.");
    if (err) throw err;
};














module.exports = "./dataEntry.js"