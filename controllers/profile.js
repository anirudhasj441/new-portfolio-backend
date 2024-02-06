const Profile = require('../models/profile')

const getProfile = async (req, res) => {
    let profile = await Profile.find({})
    console.log(profile)
    res.status(200).json({
        data: profile
    })
}

const getProfileByName = async (req, res) => {
    let profile = await Profile.findOne({name: req.params.name})
    console.log(req.params.name)
    res.status(200).json({
        data: profile
    })
}

const createProfile = async (req, res) => {
    let data = req.body;

    if(!data.name) {
        res.status(400).json({
            message: 'name is required'
        })
    }

    try{
        let result = await Profile.create(data)
        res.status(201).json({
            message: 'success'
        });
        console.log(result)
    }
    catch(error) {
        res.status(500).json({
            message: 'failed: ' + String(error)
        });
    }

}

const updateProfile = async (req, res) => {
    let data = req.body;

    let result = await Profile.findOneAndUpdate({name: req.params.name}, data)

    res.status(201).json({
        message: 'success'
    })
}

module.exports = {getProfile, createProfile, getProfileByName, updateProfile}