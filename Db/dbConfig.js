const { Pool } = require("pg");

const dbConnection = new Pool({
  user: "forumbackend_user",
  password: "iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch",
  host: "dpg-d183d9p5pdvs73bq6hb0-a.oregon-postgres.render.com",
  database: "forumbackend",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Render's PostgreSQL
  },
});

module.exports = dbConnection;
