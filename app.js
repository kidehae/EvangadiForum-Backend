require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 2112;

// Global middlewares
app.use(cors());
app.use(express.json());

// DB connection
const dbConnection = new Pool({
  user: process.env.DB_USER || "forumbackend_user",
  password: process.env.DB_PASSWORD || "iqJ5dz7FFCbu5ec4by0Yp5QI45dTfCch",
  host:
    process.env.DB_HOST ||
    "dpg-d183d9p5pdvs73bq6hb0-a.oregon-postgres.render.com",
  database: process.env.DB_NAME || "forumbackend",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Render's PostgreSQL
  },
});

// Import table schemas
const { users, questions, answers } = require("./Table/schema");

// Routes
const userRoutes = require("./Routes/userRoute");
const questionRoutes = require("./Routes/questionRoute");
const answersRoute = require("./Routes/answerRoute");
const authMiddleware = require("./MiddleWare/authMiddleWare");

// Route middleware
app.use("/api/users", userRoutes);
app.use("/api/answer", authMiddleware, answersRoute);
app.use("/api/question", authMiddleware, questionRoutes);

// Start server and create tables
async function start() {
  try {
    // Test DB connection
    await dbConnection.query("SELECT NOW()");
    console.log("Database connection established");

    // Create tables
    await dbConnection.query(users);
    await dbConnection.query(questions);
    await dbConnection.query(answers);
    console.log("Tables created successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with failure
  }
}

start();
