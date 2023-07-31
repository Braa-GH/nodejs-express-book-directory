const mysql = require("mysql");
const { config } = require("dotenv");
config({ path: "../.env" });
const connection = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.PASSWORD || "",
  database: process.env.DB_NAME || "book_directory",
};
// console.log(connection);
const dbConnection = async (callback) => {
  const db = await mysql.createConnection(connection);
  await callback(null, db);
  await db.end();
};

module.exports = dbConnection;

//test

// dbConnection((err, db) => {
//   // console.log(db)
//   db.query("insert into book(title, author,edition) values('Back-end with Node.js','Braa-GH',1)",(err, result) => {
//     if(err){
//       console.error(err);
//     }else{
//       console.log(result)
//     }
//   })
// })

// dbConnection((err, db) => {
//   // console.log(db)
//   db.query("SELECT * FROM Book",(err, result, fields) => {
//     if(err){
//       console.error(err);
//     }else{
//       // console.log(fields)
//       console.log(result)
//     }
//   })
// })