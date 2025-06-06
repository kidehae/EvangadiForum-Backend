const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getAnswersByQuestionId(req, res) {
  const { question_id } = req.params;

  if (!question_id || isNaN(question_id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Invalid question ID.",
    });
  }

  try {
    const [answers] = await dbConnection.query(
      `
      SELECT a.answer_id, a.answer AS content, u.username AS user_name, a.created_at
      FROM answers a
      JOIN users u ON a.user_id = u.userid
      WHERE a.question_id = ?
      ORDER BY a.created_at DESC
      `,
      [question_id]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found."
      });
    }

    return res.status(StatusCodes.OK).json({ answers });

  } catch (error) {
    console.error("DB error:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred."
    });
  }
}

module.exports = {
  getAnswersByQuestionId,
};
