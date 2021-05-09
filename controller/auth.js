const constants = require('../utils/constants')
const dbUpdater = require('./dbUpdater')
const userModel = require('../models/user')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.postRegister = async(req, res, next) => {
    var handle = req.body.cf_handle
    var email = req.body.email
    var password = req.body.password

    if (req.body.name) {
        var name = req.body.name
    } else {
        var name = ""
    }

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


    userModel.findOne({
        $or: [
            { email: email },
            { handle: handle }
        ]
    }).then(user => {
        if (user) {
            return res.send("User already exist.")
        }

        return bcrypt
            .hash(password, 12)
            .then(hashedPasswd => {
                return userModel({
                    handle: handle,
                    email: email,
                    password: hashedPasswd,
                    name: name,
                    city: city,
                    country: country,
                    verified: false
                }).save()
            })
            .then(res => {
                sendRegEmail(res)
                regUser(res)
            })
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

    console.log(user)

    let info = await transporter.sendMail({
        from: '"Codeforces 👻" <foo@example.com>', // sender address
        to: user.email, // list of receivers
        subject: "Registered ✔", // Subject line
        text: "Congrats, you're successfully registered", // plain text body
        html: "<b>Congrats, you're successfully registered</b>", // html body
    });
}

const regUser = async(user) => {
    var handle = user.handle
    var insertUser = dbUpdater.getUserInfo(handle)
    var insertSubmissions = dbUpdater.getSubmissions(handle)
}

exports.regUser = regUser;