const path = require('path')

const express = require('express')
const app = express()
const PORT = 3500

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
})

app.listen(process.env.PORT || PORT)