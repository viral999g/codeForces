const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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
    subCounts: Number
});

module.exports = mongoose.model('User', userSchema);