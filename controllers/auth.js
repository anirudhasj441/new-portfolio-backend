const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registerUser = async (req, res) => {
    let data = req.body;
    let username = data.username;

    let password = await bcrypt.hash(data.password, 10);

    try {
        let result = await User.create({
            username: username,
            password: password
        });
        res.status(201).json({
            msg: 'user created successfully'
        })
    }
    catch (e) {
        res.status(409).json({
            msg: 'db error: ' + String(e)
        })
    }
}

const loginUser = async (req, res) => {
    try{
        let data = req.body;
        let user = await User.findOne({ username: data.username });
        if (!user) {
            res.status(401).json({
                msg: "Invalid credentials"
            })
        }
        let passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                msg: "Invalid credentials"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({
            token: token
        })
    }
    catch(error) {
        res.status(500).json({
            msg: 'Login Failed' + String(error)
        })
    }
}

module.exports = { registerUser, loginUser }