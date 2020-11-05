const mysql = require("mysql");
const app = require("./dataEntry")
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "ssTm@1722",
    database: "staff_db",
});

app.userPrompt();

// if(err){
//     return console.log("Server not running.");  

// }
