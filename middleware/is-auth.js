const jwt = require('jsonwebtoken');
userModel = require('../models/user')
authModel = require('../models/auth')

const isAuth = async(req, res, next) => {
    try {
        const token = req.session.token;
        if (token) {
            const decode = await jwt.verify(token, "jwt token")

            const user = await authModel.findOne({ email: decode.email })
            if (!user) {
                res.redirect('/login')
            } else {
                // console.log(user)
                req.user = user
                req.token = token
                next();
            }
        } else {
            res.redirect('/login')
        }
    } catch (e) {
        res.redirect('/login')
    }
}

const isNotAuth = async(req, res, next) => {
    try {
        const token = req.session.token;
        if (token) {
            const decode = await jwt.verify(token, "jwt token")

            const user = await authModel.findOne({ email: decode.email })
            if (!user) {
                next()
            } else {
                req.use = user
                req.token = token
                res.redirect('/')
            }
        } else {
            next()
        }
    } catch (e) {
        console.log(e)
        next()
    }
}

module.exports = { isAuth, isNotAuth };