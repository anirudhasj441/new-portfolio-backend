const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        require: true
    },
    icon: {
        type: String
    },
    category: {
        type: String
    }
})

const contactSchema = new mongoose.Schema({
    email: String,
    github: String,
    linkedin: String,
    whatsapp_no: String,
    insta: String
})

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    bio: {
        type: String,

    },
    skills: [{
        skill: String,
        icon: String,
        category: String
    }],
    contact: [
        {
            email: String,
            github: String,
            linkedin: String,
            whatsapp_no: String,
            insta: String
        }
    ],
    resume: {
        type: String
    }
}, { timestamps: true })

const Profile = mongoose.model('profile', profileSchema)

module.exports = Profile