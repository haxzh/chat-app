const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({
                message: "User already exists",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({
            message: "User created successfully",
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("User found:", user);
        if (!user) {
            return res.send({ message: "User not found", success: false });
        }
        console.log("Request password:", req.body.password);
        console.log("User password:", user.password);

        if (!req.body.password || !user.password) {
            return res.status(400).send({
                message: "Password missing in request or user record.",
                success: false
            });
        }

        // Defensive: check if user.password is a string
        if (typeof user.password !== "string") {
            return res.status(400).send({
                message: "User password is not a string.",
                success: false
            });
        }

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.send({ message: "Invalid password", success: false });
        }

        if (!process.env.SECRET_KEY) {
            return res.status(500).send({
                message: "SECRET_KEY is not set in environment variables.",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );
        res.send({ message: "Login successful", success: true, token });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;