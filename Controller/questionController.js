const dbConnection = require("../Db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const getAllQuestions = async (req, res) => {
  try {
    const [questions] = await dbConnection.query(`
      SELECT 
        q.questionid ,
        q.title,
        q.description ,
        u.username 
      FROM questions q
      JOIN users u ON q.userid = u.userid
    `); 

    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }

    res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: error.message || "An unexpected error occurred."
    });
  }
};

module.exports = {
  getAllQuestions
};


