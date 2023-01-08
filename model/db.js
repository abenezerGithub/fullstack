require("dotenv").config()
const mysql = require("mysql2")
const pool = mysql.createPool({
  host:"0.0.0.0",
  user:"root",
  database:"holistic",
  password:"root",
})

pool.on('error', function(err) {
  console.log("DB Connection Error");
})
pool.on("success",function() {
  console.log("DB Connection success.")
})

module.exports = pool.promise()