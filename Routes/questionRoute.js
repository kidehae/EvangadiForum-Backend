const express = require("express");
const router = express.Router();
const { getSingleQuestion } = require("../Controller/questionController");

router.get("/:question_id", getSingleQuestion);

module.exports = router;
