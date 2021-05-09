const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    problems: [{
        type: Schema.Types.ObjectId,
        ref: 'Problem',
    }]
});

module.exports = mongoose.model('Tag', tagSchema);