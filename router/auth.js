const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.get('/register', (req, res, next) => {
    res.render('registration')
})

router.get('/login', (req, res, next) => {
    res.send('Login')
})

router.post('/register', authController.postRegister)


module.exports = router;