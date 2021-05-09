const constants = require('../utils/constants')
const dbUpdater = require('./dbUpdater')
const userModel = require('../models/user')
const authModel = require('../models/auth')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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

exports.regUser = regUser;