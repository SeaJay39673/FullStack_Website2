require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors");
const app = express()
const PORT = 7001

const Account = require("./routes/Account.js")

app.use(cors())
app.use(express.json())

app.use("/api/account", Account)

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