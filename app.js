const path = require('path')

const express = require('express')
const app = express()

const mongoConnect = require('./utils/db').mongoConnect
const constants = require('./utils/constants')

const PORT = 3500

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, './views/index.html'))
    res.send("Hello Coder!")
})

// app.get('/login', (req, res, next) => {
//     res.sendFile(path.join(__dirname, './views/login.html'))
// })

mongoConnect(() => app.listen(process.env.PORT || PORT, () => console.log('Server Started!')))