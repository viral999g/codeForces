const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    contestId: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    tags: Array,
    rating: String,
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission',
    }]
});

module.exports = mongoose.model('Problem', problemSchema);