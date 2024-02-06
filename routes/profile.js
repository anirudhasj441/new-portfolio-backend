const express = require('express');

const {getProfile, createProfile, getProfileByName, updateProfile} = require('../controllers/profile');
const { verifyToken } = require('../middlewares');


const router = express.Router()

router.route('/')
.get(getProfile)
.post(verifyToken, createProfile)

router.route('/:name')
.get(getProfileByName)
.patch(verifyToken, updateProfile)

module.exports = router