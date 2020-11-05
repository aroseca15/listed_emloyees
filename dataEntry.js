const mysql = require("mysql");
const inquirer = require("inquirer");
const Etable = require("console.table");

function userPrompt (){
    inquirer.prompt([
        {
            message: "What would you like to see or make changes?",
            type: "rawlist",
            name: "staff",
            choices: ["Staff Members", "Positions", "Departments", "View Records"]
        },
    ]).then((res) => {
        switch(res.staff){
            case "Staff Members":
               StaffSelect()
                break
            case "Positions":
               PositionSelect()
                break
            case "Departments":
                DepartmentSelect()
                     break
            case  "Display Records":
                        displayRecords()
                        break
            // default:
            //     connection.end();
            //     process.exit(0);
        }
    })
};


function StaffSelect(res, err){
    console.log("direction works.");
    if(err) throw err;
};

function PositionSelect(res, err){
    console.log("direction works.");
    if(err) throw err;
};

function DepartmentSelect(res, err){
    console.log("direction works.");
    if(err) throw err;
};

function  displayRecords(){
    console.log("directory works.");
    if(err) throw err;
};














module.exports = dataEntry.js