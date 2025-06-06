const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // || 10 - Fallback if the environment variable is: Missing/undefined/Empty string
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
});

// Converts the pool to use Promise-based queries instead of callbacks.

module.exports = dbConnection.promise();




// const mysql2=require('mysql2')


// const dbconnection=mysql2.createPool({
//     user:"Evangadi-admin",
//     database:"evangadi-db",
//     host:"localhost",
//     password:"Evangadi123456$$",
//     connectionLimit:10
// });



// module.exports =dbConnection.promise();
const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({
//   socketPath: process.env.DB_SOCKET_PATH,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   // || 10 - Fallback if the environment variable is: Missing/undefined/Empty string
//   connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
// });

// // Converts the pool to use Promise-based queries instead of callbacks.
// module.exports = dbConnection.promise();