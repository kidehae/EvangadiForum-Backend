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

module.exports = { getSingleQuestion };
