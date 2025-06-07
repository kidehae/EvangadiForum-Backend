const express = require("express");
const router = express.Router();

// Import question controller functions
const { getSingleQuestion } = require("../Controller/questionController");
const { getAllQuestions } = require("../Controller/questionController");

router.get("/", getAllQuestions);
router.get("/:question_id", getSingleQuestion);

module.exports = router;
