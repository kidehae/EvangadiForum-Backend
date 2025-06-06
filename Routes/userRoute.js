const express = require('express');
const router = express.Router();
const authMiddleware = require('../MiddleWare/authMiddleWare');
const { login } = require('../Controller/userController');

router.post('/login', login);

module.exports = router;
