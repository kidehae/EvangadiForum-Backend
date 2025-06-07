// db connection
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function createQuestion(req, res) {
  const { title, description } = req.body;
  const user_id = req.user.userid;

  // Validate required fields
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    // Insert new question into database
    await dbConnection.query(
      `
      INSERT INTO questions (title, description, user_id)
      VALUES (?, ?, ?)
    `,
      [title, description, user_id]
    );

    // Return success message with 201 Created status
    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    console.error(error.message);
    // Return 500 Internal Server Error for any unexpected errors
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Export the functions to be used in routes
module.exports = {
  createQuestion,
};
