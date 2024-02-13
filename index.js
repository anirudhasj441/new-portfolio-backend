const serverless = require("serverless-http");
const express = require("express");
const {connectMongoDB} = require('./middlewares')

const profileRouter = require('./routes/profile');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

require('dotenv').config()

const app = express();

app.use(express.json())

app.use(connectMongoDB(process.env.MONGO_URI))

app.use('/profile', profileRouter);

app.use('/auth', authRoutes);

app.use('/upload', uploadRoutes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
