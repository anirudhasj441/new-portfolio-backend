const {S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Profile = require('../models/profile');

require('dotenv').config();

const bucket = process.env.S3_BUCKET;

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

const getResumeUploadUrl  = async (req, res) => {
    const key = `uploads/${req.params.name}/Resume.pdf`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: 'application/pdf'
    })
    const url = await getSignedUrl(s3Client, command);

    res.status(200).json({
        url: url
    })
}

const getSkillIconUploadUrl = async (req, res) => {
    let data = req.body;
    let filename = data.filename;

    let profile = await Profile.findOne({name: req.params.name});
    let skill = profile.skills.id(req.params.skill_id);

    let ext = filename.split('.')[1];

    let contentTypes = {
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg'
    } 
    const key = `uploads/${req.params.name}/skill_icons/${skill.skill}.${filename.split('.')[1]}`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentTypes[ext]
    })

    const url = await getSignedUrl(s3Client, command);

    res.status(200).json({
        url: url,
        skill_icon: key
    })

}

const checkKeyExists = async (key) => {
    const command = new HeadObjectCommand({
        Bucket: bucket,
        Key: key
    })
    try {
        await s3Client.send(command);
        return true;
    } catch {
        return false;
    }
}

const getResumeUrl = async (req, res) => {
    const key = `uploads/${req.params.name}/Resume.pdf`;

    let resumeExists = await checkKeyExists(key);
    if(!resumeExists) {
        res.status(200).json({
            url: ''
        })
        return 
    }
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ResponseContentType: 'application/pdf',
    })

    const url = await getSignedUrl(s3Client, command)

    res.status(200).json({
        url: url
    })
}

module.exports = {getResumeUploadUrl, getResumeUrl, getSkillIconUploadUrl};