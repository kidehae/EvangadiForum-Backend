
const dbConnection = require("../Db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

//* Function to handle user login
async function login(req, res) {
  // Extract email and password from request body
const { email, password } = req.body;

  // Validate that both email and password are provided and prevents empty/null values from proceeding
if (!email || !password) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: "Please enter all required fields" });
}

try {
    // Query database to find user by email
    const [user] = await dbConnection.query(
    "SELECT username, userid, password FROM users WHERE email = ?",
    [email]
    );

    // Check if user exists in database and If no user found, return invalid credentials error
    if (user.length == 0) {
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    // Compare provided password with stored hashed password using bcrypt and return boolean
    const isMatch = await bcrypt.compare(password, user[0].password);

    // Return error if password doesn't match
    if (!isMatch) {
    return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    // If Password matches Extract user data from database result
    const { username, userid } = user[0];

    // const token = jwt.sign(payload, secretOrPrivateKey, options);
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    });

    // Send success response with token
    return res
    .status(StatusCodes.OK)
    .json({ msg: "user login successful", token, username });
} catch (error) {
    console.log(error.message);

    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something went wrong, try again later!" });
}
}





//* Function to handle user registration
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    // password must be atleast 8 characters
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10); //this will return a string
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = {
  register ,login
};