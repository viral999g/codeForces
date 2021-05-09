const constants = require('../utils/constants')
const dbUpdater = require('./dbUpdater')
const userModel = require('../models/user')
const subModel = require('../models/submission')
const tagModel = require('../models/tag')

exports.getProfileInfo = (req, res, next) => {
    var handle = req.params.handle
    console.log(handle)
    userModel
        .findOne({ handle: new RegExp(`^${handle}$`, 'i') })
        .then(results => {
            return subModel
                .find({ user: results._id })
                .then(data => {
                    if (data.length) {
                        results.subCounts = data.length
                        data.forEach(d => {
                            d.memoryConsumedBytes = (d.memoryConsumedBytes / (1024)).toPrecision(2)
                        })
                    } else {
                        results.subCounts = 0
                    }
                    res.render('profile', {
                        userInfo: results,
                        submissions: data
                    })
                }).catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}

exports.getProblemSet = (req, res, next) => {
    tagModel.distinct("name", function(error, r) {
        var data = []
        r.forEach(element => {
            tagModel
                .findOne({ name: element })
                .then(doc => {
                    if (doc) {
                        data.push(doc)
                    }
                    return
                })
        });

        res.render('problemsets', {
            tags: data
        })
    })
}

exports.getProblems = async(req, res, next) => {
    var type = req.params.problemType
    tagModel.findOne({ name: new RegExp(`^${type}$`, 'i') })
        .populate('problems')
        .then(doc => {
            if (!doc) {
                return res.redirect('/')
            }

            res.render('problemtype', {
                data: doc.problems,
                questiontype: type
            })
        })
}

exports.getSolutions = async(req, res, next) => {
    var contestId = req.params.contestId
    var index = req.params.index

    subModel.find({ 'problem.contestId': parseInt(contestId), 'problem.index': index })
        .populate('user')
        .then(doc => {
            if (doc.length < 1) {
                return res.redirect('/')
            }

            doc.forEach((d, index) => {
                doc[index].memoryConsumedBytes = (d.memoryConsumedBytes / (1024)).toPrecision(2)
            })

            res.render('submissions', {
                data: doc,
                question: doc[0].problem.name
            })
        })
}

exports.getUsers = async(req, res, next) => {
    userModel
        .find()
        .then(async users => {
            await users.forEach(async(user, index) => {
                subModel.countDocuments({ user: user._id })
                    .exec((err, count) => {
                        users[index].subCounts = count
                    });
            })
            console.log(users)
            return users
        })
        .then(users => {
            console.log(users)
            res.render('home', {
                users: users
            })
        })
}