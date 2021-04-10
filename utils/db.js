const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const constants = require('./constants')

const DB_NAME = constants.DB_NAME

let db;

const mongoConnect = callback => {
    MongoClient.connect(constants.MONGO_URI)
        .then(client => {
            console.log('Connected to DB')
            db = client.db()
            callback()
        }).catch(err => {
            console.log(err)
            throw err;
        });
}

const getDB = () => {
    if (_db) {
        return db
    }
    throw 'Database not found'
}

exports.mongoConnect = mongoConnect
exports.db = getDB