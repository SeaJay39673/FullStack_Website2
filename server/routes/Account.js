const express = require("express");
const jwt = require("jsonwebtoken"); // Import JWT
require("dotenv").config()
const Account = require("../schemas/AccountSchema.js")
const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." })
        }

        // Check if the email is already registered
        existingAccount = await Account.findOne({ email })
        if (existingAccount) {
            return res.status(400).json({ message: "Email is already in use." })
        }

        // Check if the email is already registered
        existingAccount = await Account.findOne({ username })
        if (existingAccount) {
            return res.status(400).json({ message: "Username is already in use." })
        }

        // Create a new account
        const newAccount = new Account({
            username,
            email,
            password, // Assuming password hashing happens in the schema middleware
        })

        // Save the account to the database
        await newAccount.save()

        // Generate a JWT
        const token = jwt.sign(
            { id: newAccount._id, username: newAccount.username }, // Payload
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(201).json({
            message: "Account registered successfully.",
            token
        })
    } catch (error) {
        console.error("Error registering account:", error)
        res.status(500).json({ message: "Internal server error." })
    }
})

module.exports = router