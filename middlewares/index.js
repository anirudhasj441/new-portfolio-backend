const {connectDB} = require('../connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const connectMongoDB = (uri) => {
    return async (req, res, next) => {
        await connectDB(uri);
        next();
    }
}

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token: ' + String(error) });
    }
}

module.exports = {connectMongoDB, verifyToken};