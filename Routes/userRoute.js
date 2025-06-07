const express = require("express");
const router = express.Router();

// Authentication middleware
// const authMiddleware = require('../MiddleWare/authMiddleWare')
// user controllers
const { login, register, checkUser } = require("../Controller/userController");

// Register route
router.post("/register", register);



module.exports=router