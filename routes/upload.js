const express = require('express');
const { getResumeUploadUrl, getResumeUrl, getSkillIconUploadUrl } = require('../controllers/upload');

const router = express.Router();

router.route('/resume/:name')
.get(getResumeUploadUrl)

router.route('/resume/get_url/:name')
.get(getResumeUrl)

router.route('/skill_icon/:name/:skill_id')
.post(getSkillIconUploadUrl)

module.exports = router;