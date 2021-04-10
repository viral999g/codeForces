const path = require('path')

const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
})

app.listen(PORT)