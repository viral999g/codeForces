const dbUpdater = require('./dbUpdater')
const userModel = require('../models/user')
const authModel = require('../models/auth')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const constants = require('../config/constants')


exports.postRegister = async(req, res, next) => {
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var handle = req.body.cf_handle
    var email = req.body.email
    var password = req.body.password


    if (req.body.city) {
        var city = req.body.city
    } else {
        var city = ""
    }

    if (req.body.country) {
        var country = req.body.country
    } else {
        var country = ""
    }


    authModel.findOne({
        $or: [
            { email: email },
            { handle: handle }
        ]
    }).then(auth => {
        if (auth) {
            return res.send({ statusCode: 200, message: "User already exist!" })
        } else {
            return bcrypt
                .hash(password, 12)
                .then(hashedPasswd => {
                    return new authModel({
                        handle: handle,
                        email: email,
                        password: hashedPasswd,
                        firstName: firstName,
                        lastName: lastName,
                        verified: false
                    }).save().then(r => {
                        res.send({ statusCode: 200, message: "Successfully Registered" })
                        sendRegEmail(r)
                        regUser(r)
                    })
                })
        }


    }).catch(e => console.log(e))
}

const sendRegEmail = async(user) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: constants.EMAIL, // generated ethereal user
            pass: constants.PASSWD, // generated ethereal password
        },
    });


    let info = await transporter.sendMail({
        from: '"Codeforces 👻" <codeforces@example.com>', // sender address
        to: user.email, // list of receivers
        subject: "Registered ✔", // Subject line
        text: "Congrats, you're successfully registered", // plain text body
        html: "<b>Congrats, you're successfully registered</b>", // html body
    });
}

const regUser = async(user) => {
    var handle = user.handle
    var insertUser = await dbUpdater.getUserInfo(handle)
        // var insertSubmissions = dbUpdater.getSubmissions(handle)
}

exports.postLogin = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)

    authModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.send({ statusCode: 200, message: "Invalid Credentials" })
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({
                                email: user.email
                            },
                            "jwt token", {
                                expiresIn: '24h'
                            })
                        req.session.token = token
                        return req.session.save(err => {
                            console.log("Success");
                            res.send({ statusCode: 200, message: "Logged in!" })
                        });
                    }
                    res.send({ statusCode: 200, message: "Invalid Credentials" })
                }).catch(err => {
                    res.send({ statusCode: 200, message: err.message })
                });
        })
        .catch(err => console.log(err));
};

exports.logoutPost = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.send({ statusCode: 401, message: err.message })
        }
        res.send({ statusCode: 200, message: 'Logged out successfully' })
    })
}

exports.regUser = regUser;