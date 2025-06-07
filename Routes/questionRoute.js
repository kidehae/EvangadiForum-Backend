const express = require("express");
const router = express.Router();

// Import question controller functions

const { getAllQuestions } = require("../Controller/questionController");



router.get("/", getAllQuestions);

module.exports = router;
