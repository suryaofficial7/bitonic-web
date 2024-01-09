const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "154.41.253.154",
    user: "root",
    password: "Surya@810460887",
    database:"bitonic",
    port:3306
  })
console.log(conn);
exports.conn = conn;