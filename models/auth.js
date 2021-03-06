const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: String,
    country: String,
    profileImg: String,
    regToken: String,
    regTokenExpiration: Date,
    resetToken: String,
    resetTokenExpiration: Date,
    verified: Boolean
});

module.exports = mongoose.model('Auth', userSchema);