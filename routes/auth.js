const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//import config from '../../config';
const jwt = require("jsonwebtoken");
//const auth = require("../../middleware/auth");
//const auth = require("../../middleware/auth");
// User Model
const User = require("../models/User");
const passport = require("../passportConfig");

const JWT_SECRET = "adajshdjash"; // for now
//const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing user
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User Does not exist" });

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials" });

            jwt.sign(
                { id: user._id },
                process.env.SECRET_OR_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                    });
                }
            );
        });
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (user) throw Error("User already exists");

        // create salt and hash
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Something went wrong with bcrypt");

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error("Something went wrong hashing the password");

        const newUser = new User({
            name,
            email,
            password: hash,
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Something went wrong saving the user");

        const token = jwt.sign(
            { id: savedUser._id },
            process.env.SECRET_OR_KEY,
            {
                expiresIn: 3600,
            }
        );

        res.status(200).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post(
    "/user",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user) {
            return res.send(req.user);
        } else {
            res.status(400).json({ msg: "Error finding user." });
        }
    }
);
module.exports = router;
