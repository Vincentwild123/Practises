const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2652711477',
    database: 'test01',
});
connection.connect();
module.exports = connection;