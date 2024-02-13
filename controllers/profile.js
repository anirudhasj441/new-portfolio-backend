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

const getSkills = async (req, res) => {
    let result = await Profile.findOne({name: req.params.name}).select('skills');
    console.log(result.skills);
    res.status(200).json({
        data: result.skills
    })
}

const addSkill = async (req, res) => {
    let data = req.body;
    let profile = await Profile.findOne({name: req.params.name})
    profile.skills.push(data);
    await profile.save();
    res.status(200).json({
        message: 'success'
    })
}

const editSkill = async (req, res) => {
    let data = req.body;
    // let profile = await Profile.findOneAndUpdate(
    //     {
    //         name: req.params.name, 
    //         'skills._id': req.params.skill_id
    //     },
    //     {'skills.$': data}
    // )

    let profile = await Profile.findOne({name: req.params.name});
    let skill = profile.skills.id(req.params.skill_id)
    Object.assign(skill, data);
    skill.parent().save();
    res.status(200).json({
        msg: 'success'
    })
}

const getSkillById = async (req, res) => {
    let profile = await Profile.findOne({name: req.params.name});
    let skill = profile.skills.id(req.params.skill_id);
    
    res.status(200).json({
        data: skill
    })
    
}

const deleteSkill = async (req, res) => {
    let profile = await Profile.findOne({name: req.params.name});
    let skill = profile.skills.id(req.params.skill_id).deleteOne();

    await profile.save();

    res.status(200).json({
        msg: 'success'
    })
}

module.exports = {
    getProfile, 
    createProfile, 
    getProfileByName, 
    updateProfile, 
    getSkills,
    addSkill,
    getSkillById,
    editSkill,
    deleteSkill
}