const fetch = require('node-fetch');
const userModel = require('../models/user')
const subModel = require('../models/submission')
const probModel = require('../models/problem')
const tagModel = require('../models/tag')

const getUserInfo = async(handle) => {
    const result = await fetch(`${process.env.CF_BASE_URL}/user.info?handles=${handle}`)
    const json = await result.json()
    if (json.status = 'OK') {
        if (json.result.length > 0) {
            var userData = json.result[0]
            var handle = userData.handle

            return userModel.findOne({ handle: handle })
                .then(userDoc => {
                    if (userDoc) {
                        console.log("User already exist")
                        return true;
                    }

                    new userModel({
                            handle: handle,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            city: userData.city,
                            country: userData.country,
                            friends: userData.friends,
                            ratings: userData.ratings,
                            maxRatings: userData.maxRating,
                            rank: userData.rank,
                            maxRank: userData.maxRank,
                            profileImg: userData.avatar
                        })
                        .save()
                        .then(r => {
                            getSubmissions(handle)
                            return true
                        })
                        .catch(e => {
                            console.log(e);
                            return false
                        })
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            console.log('User not found')
            return false
        }
    } else if (json.status = 'FAILED') {
        console.log('User not found')
    }
    return false
}

const getSubmissions = async(handle) => {
    var sub_counts = 1
    console.log(handle)
    userModel
        .findOne({ handle: handle })
        .then(userDoc => {
            console.log(userDoc)
        })
    userModel.findOne({ handle: handle })
        .then(async userDoc => {
            while (true) {
                const api = await fetch(`${process.env.CF_BASE_URL}/user.status?handle=${handle}&from=${sub_counts}&count=1000`)
                const res = await api.json()
                if (res.status = 'OK') {
                    if (res.result.length > 0) {
                        var data = res.result
                        data.forEach(element => {
                            var v = element.verdict.toString()
                            if (v != "OK") {
                                return
                            }
                            console.log(userDoc)
                            var sub_id = element.id.toString()
                            subModel
                                .findOne({ id: sub_id })
                                .then(subDoc => {
                                    if (subDoc) {
                                        addProblem(subDoc)
                                        return
                                    }

                                    new subModel({
                                            id: sub_id,
                                            user: userDoc._id,
                                            problem: element.problem,
                                            contestId: element.contestId,
                                            programmingLanguage: element.programmingLanguage,
                                            verdict: element.verdict,
                                            passedTestCount: element.passedTestCount,
                                            timeConsumedMillis: element.timeConsumedMillis,
                                            memoryConsumedBytes: element.memoryConsumedBytes
                                        })
                                        .save()
                                        .then(r => {
                                            return addProblem(r);

                                        })
                                        .catch(e => {
                                            console.log(e);
                                            return false
                                        })
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                        });
                        sub_counts += 1000
                    } else {
                        console.log('No further data found')
                        break
                    }
                } else if (res.status = 'FAILED') {
                    console.log('User not found')
                }

                sub_counts += 1000
            }
        })
}

const addTags = async(prob) => {
    var probId = prob._id
    var tags = prob.tags

    tags.forEach(tag => {
        return tagModel
            .findOne({ name: tag })
            .then(doc => {
                if (doc) {
                    if (probId in doc.problems) {
                        return
                    } else {
                        doc.problems.push(probId)
                        return doc.save()
                    }
                } else {
                    return new tagModel({
                            name: tag,
                            problems: [probId]
                        })
                        .save()
                        .then(r => {})
                        .catch(e => {
                            console.log(e);
                        })

                }

            })
            .catch(e => {
                console.log(e)
            })


    });
}

const addProblem = async(sub) => {
    var problem = sub.problem
    var contest_id = problem.contestId
    var index = problem.index
    var sub_id = sub._id

    if (!('contestId' in problem)) {
        return
    }

    return probModel
        .findOne({ contestId: contest_id, index: index })
        .then(prob => {
            if (prob) {
                const subIndex = prob.submissions.findIndex(s => {
                    return sub_id.toString() === s.toString()
                })
                if (subIndex >= 0) {
                    return
                }
                prob.submissions.push(sub_id)
                return prob.save()

            } else {

                var rating = "N/A"
                var tags = ['Others']
                if ('rating' in problem) {
                    rating = problem.rating.toString()
                }

                if (problem.tags.length > 0) {
                    tags = problem.tags
                }
                return new probModel({
                        contestId: contest_id,
                        index: index,
                        name: problem.name,
                        tags: problem.tags,
                        rating: rating,
                        submissions: [sub_id]
                    })
                    .save()
                    .then(r => {
                        var tags = r.tags
                        var tagResults = tags.map(tag => {
                            return tagModel
                                .findOne({ name: tag })
                                .then(doc => {
                                    if (doc) {
                                        const probIndex = doc.problems.findIndex(p => {
                                            return p.toString() === r._id.toString();
                                        });
                                        if (probIndex >= 0) {
                                            return
                                        } else {
                                            doc.problems.push(r._id)
                                            return doc.save()
                                        }
                                    } else {
                                        return new tagModel({
                                                name: tag,
                                                problems: [r._id]
                                            })
                                            .save()
                                            .then(r => {})
                                            .catch(e => {
                                                console.log(e);
                                            })
                                    }

                                })
                                .catch(e => {
                                    console.log(e)
                                })
                        });
                        return Promise.all(tagResults).then(r => {
                            return r
                        })
                    })
                    .catch(e => {
                        console.log(e);
                        console.log(problem);
                    })
            }
        }).catch(e => {
            console.log(e)
        })


}

module.exports = {
    getUserInfo,
    getSubmissions
}