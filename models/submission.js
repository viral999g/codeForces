const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problem: Object,
    contestId: String,
    programmingLanguage: String,
    verdict: String,
    passedTestCount: String,
    timeConsumedMillis: Number,
    memoryConsumedBytes: Number
});

module.exports = mongoose.model('Submission', submissionSchema);