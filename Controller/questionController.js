const dbConnection = require("../Db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getSingleQuestion(req, res) {
  const questionId = req.params.question_id;

  try {
    const [question] = await dbConnection.query(
      `SELECT q.*, u.username FROM questions q JOIN users u ON q.userid = u.userid WHERE q.questionid = ?`,
      [questionId]
    );

    if (question.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Question not found!! id: ${questionId} `,
      });
    }

    const [answers] = await dbConnection.query(
      `SELECT a.*, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid = ? `,
      [questionId]
    );

    res.status(StatusCodes.CREATED).json({
      status: "Success",
      question: question[0],
      answers: answers,
    });
  } catch (error) {
    console.error("Error fetching question: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

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
      message: error.message || "An unexpected error occurred.",
    });
  }
};

module.exports = {
  getAllQuestions,
  getSingleQuestion,
};
