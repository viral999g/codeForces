const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.get('/register', authController.postRegister)

module.exports = router;