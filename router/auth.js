const express = require('express');

const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/register', isAuth.isNotAuth, (req, res, next) => {
    res.render('registration')
})

router.get('/login', isAuth.isNotAuth, (req, res, next) => {
    res.render('login')
})

router.post('/login', isAuth.isNotAuth, authController.postLogin)

router.post('/logout', isAuth.isAuth, authController.logoutPost)

router.post('/register', isAuth.isNotAuth, authController.postRegister)


module.exports = router;