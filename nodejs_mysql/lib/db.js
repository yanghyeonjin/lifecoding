var secret_key = require("../secret_key");
var mysql = require("mysql");

var db = mysql.createConnection({
    host: `${secret_key.mysql_host}`,
    user: `${secret_key.mysql_user}`,
    password: `${secret_key.mysql_password}`,
    database: `${secret_key.mysql_database}`,
    port: `${secret_key.mysql_port}`
});

db.connect();

module.exports = db;
