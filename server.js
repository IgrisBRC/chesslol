require('dotenv').config()

const PORT = process.env.PORT

const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { 'root': './' })
})

app.listen(PORT, () => {
    console.log(`listen at port ${PORT}`)
})

