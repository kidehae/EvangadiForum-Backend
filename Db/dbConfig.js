const mysql2 = require("mysql2");

// Create a connection pool to manage multiple database connections efficiently.
const dbConnection = mysql2.createPool({
  // socketPath: process.env.DB_SOCKET_PATH,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // || 10 - Fallback if the environment variable is: Missing/undefined/Empty string
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10, 
  // It attempts to parse an environment variable; if it's missing or invalid, it defaults to 10.
});

// Converts the pool to use Promise-based queries instead of callbacks.
module.exports = dbConnection.promise(); // This allows you to use async/await syntax for database queries, making the code cleaner and more readable.