const mysql = require("mysql2")

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

console.log(process.env.DB_USER);
connection.connect((err)=>{
  if(err)return console.error(err.message)
  
    console.log(`connected to Mysql server with dbname : ${process.env.DB_NAME} successfully`);
  
})

module.exports = connection