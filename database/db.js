const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"bitonic"
  })

exports.conn = conn;