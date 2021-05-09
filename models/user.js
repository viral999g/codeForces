const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    handle: {
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
    submissions: {
        items: [{
            type: Schema.Types.ObjectId,
            ref: 'Submission',
        }]
    },
    city: String,
    country: String,
    friends: String,
    ratings: String,
    maxRatings: String,
    rank: String,
    maxRank: String,
    profileImg: String,
});

module.exports = mongoose.model('User', userSchema);