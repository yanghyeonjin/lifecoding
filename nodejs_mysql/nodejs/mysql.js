var mysql = require("mysql"); // mysql 변수를 통해 mysql 모듈을 사용하겠다.
var secret_key = require("../secret_key.js");
var connection = mysql.createConnection({
    host: "localhost",
    user: `${secret_key.mysql_user}`,
    password: `${secret_key.mysql_password}`,
    database: "opentutorials",
    port: 3307
});

connection.connect();

connection.query("SELECT * FROM topic", function(error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();
