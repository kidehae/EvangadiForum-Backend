// !finish

const express = require("express");
const router = express.Router();

// Import question controller functions
const {
  createQuestion,
} = require("../Controller/questionController");

/**
 * Get all questions
 * Endpoint: api/question
 * Method: GET
 */
// router.get("/", getAllQuestions);

/**
 * Get a single question by ID
 * Endpoint: api/question/:question_id
 * Method: GET
 */
// router.get("/:questionId", getSingleQuestion);

/**
 * Create a new question
 * Endpoint: api/question
 * Method: POST
 */
router.post("/", createQuestion);

module.exports = router;
