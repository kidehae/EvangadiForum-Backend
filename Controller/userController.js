const dbConnection = require("../Db/dbConfig");
const bcrypt = require("bcrypt"); // For password hashing
const { StatusCodes } = require("http-status-codes"); // For standardized HTTP status codes
const jwt = require("jsonwebtoken"); // For creating JSON Web Tokens

//* Function to handle user login
async function login(req, res) {
  // Extract email and password from request body
  const { email, password } = req.body; // Gets data sent from the frontend

  // Validate that both email and password are provided
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST) // 400 Bad Request: Client sent incomplete data
      .json({ msg: "Please enter all required fields" });
  }

  try {
    // Query database to find user by email
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    // Check if user exists in database (user.length will be 0 if not found)
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST) // 400 Bad Request: User not found for email
        .json({ msg: "invalid credential" }); // Generic message for security
    }

    // Compare provided password with stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user[0].password);

    // Return error if password doesn't match
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED) // 401 Unauthorized: Password incorrect
        .json({ msg: "Invalid credentials" }); // Generic message for security
    }

    // If Password matches, extract user data from database result
    const { username, userid } = user[0]; // Destructure relevant user info

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      // Creates a JWT
      { username, userid }, // Payload: data to store in the token (non-sensitive)
      "wjiLHtT2OgGnVlfZZzywl0cb9DzvWRHx", // Secret key from .env for signing the token
      { expiresIn: "30d" } // Token expiration: 30 days
    );

    // Send success response with token and username
    return res
      .status(StatusCodes.OK) // 200 OK: Login successful
      .json({ msg: "user login successful", token, username }); // Send token and username to frontend
  } catch (error) {
    console.log("Login error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR) // 500 Internal Server Error: Unexpected server issue
      .json({ msg: "something went wrong, try again later!" });
  }
}

//* Function to handle user registration
async function register(req, res) {
  // Asynchronous function for DB and hashing
  const { username, firstname, lastname, email, password } = req.body; // Get all registration fields

  // Validate that all required fields are provided
  if (!email || !password || !firstname || !lastname || !username) {
    // Corrected: Added opening curly brace here
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    // Check if user already exists with provided username or email
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      // If user found, registration fails
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "User already registered" });
    }

    // password must be at least 8 characters
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Generates a salt (random value for hashing)
    const hashedPassword = await bcrypt.hash(password, salt); // Hashes the password with the salt

    // Insert new user into the database
    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword] // Values to insert
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log("Registration error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

//* Function to check user status
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = {
  register,
  login,
  checkUser,
};
