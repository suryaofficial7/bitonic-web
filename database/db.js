const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"bitonic",
    // port:3306
  })
// console.log(conn);
exports.conn = conn;