const express = require('express')
const app = express()
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const path = require('path')

const authRouter = require('./router/auth')
const auth = require('./controller/auth')
const profileRouter = require('./router/profile')

const PORT = 8080
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

app.set('view engine', 'hbs');
app.set('views', 'views/layouts');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile', express.static(path.join(__dirname, 'public')));
app.use('/problems', express.static(path.join(__dirname, 'public')));

app.use(profileRouter)
app.use(authRouter)
app.use('/', (req, res, next) => {
    // auth.regUser({ 'handle': 'Benq' })
    res.render('notfound')
})

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log(`Connected to port ${PORT}`)
        app.listen(process.env.PORT || PORT);
    })
    .catch(err => {
        console.log(err);
    });