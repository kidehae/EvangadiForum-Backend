const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  // socketPath: process.env.DB_SOCKET_PATH,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  userUsername: "forumbackend_user",
  password: "iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch",
  host: "dpg-d183d9p5pdvs73bq6hb0-a",
  database: "forumbackend",
  Internal Database URL: "postgresql://forumbackend_user:iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch@dpg-d183d9p5pdvs73bq6hb0-a/forumbackend",
  External Database URL: "postgresql://forumbackend_user:iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch@dpg-d183d9p5pdvs73bq6hb0-a.oregon-postgres.render.com/forumbackend",
  PSQL Command: "PGPASSWORD=iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch psql -h dpg-d183d9p5pdvs73bq6hb0-a.oregon-postgres.render.com -U forumbackend_user forumbackend",
  connectionLimit: 10,
  Port: 5432
  
});

module.exports = dbConnection.promise();
