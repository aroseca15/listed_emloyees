const mysql = require("mysql");
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

if(err){
    console.log("Server not running." + err);  
}  else(res) => {
    console.log(`Connected to db with id: ${connection.threadId}`);
    userPrompt();
}

