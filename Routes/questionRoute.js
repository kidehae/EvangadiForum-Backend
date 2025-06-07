
const express = require("express");
const router = express.Router();

// Import question controller functions
const { createQuestion } = require("../Controller/questionController");

router.post("/", createQuestion);

module.exports = router;
