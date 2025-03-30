const express = require("express")
const app = express()
const PORT = 7000

app.get("/", (req, res) => {
    res.send("Hello, World")
})

app.listen(PORT, (err) => {
    if (err)
        console.log(err)
    console.log(`App listening on port ${PORT}`)
})