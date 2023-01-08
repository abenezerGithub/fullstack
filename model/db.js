require("dotenv").config()
const mysql = require("mysql2")
const pool = mysql.createPool({
  host:"sql6.freesqldatabase.com",
  user:"sql6589079",
  database:"sql6589079",
  password:"s3KiIni56q",
})

pool.on('error', function(err) {
  console.log("DB Connection Error");
})
pool.on("success",function() {
  console.log("DB Connection success.")
})

module.exports = pool.promise()
