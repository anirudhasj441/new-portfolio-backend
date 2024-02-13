const express = require('express');

const {getProfile, createProfile, getProfileByName, updateProfile, getSkills, addSkill, getSkillById, editSkill, deleteSkill} = require('../controllers/profile');
const { verifyToken } = require('../middlewares');


const router = express.Router()

router.route('/')
.get(getProfile)
.post(verifyToken, createProfile)

router.route('/:name')
.get(getProfileByName)
.patch(verifyToken, updateProfile)

router.route('/:name/skill')
.get(getSkills)
.post(verifyToken, addSkill)

router.route('/:name/skill/:skill_id')
.get(getSkillById)
.patch(verifyToken, editSkill)
.delete(verifyToken, deleteSkill)

module.exports = router