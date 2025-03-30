require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const PORT = 7000

app.get("/", (req, res) => {
    res.send("Hello, World")
})

async function start() {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
        app.listen(PORT, (err) => {
            if (err)
                console.log(err)
            console.log(`App listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()