const Password = require('../models/passwordSchema');

// Get all Passwords
const getPassword = async(req, res) => {
    try {
        const passwords = await Password.find({});
        res.json(passwords);
    }catch(error) {
        res.status(500).json({message: 'Error fetching passwords', error});
    }
};

// Add a new Password
const addPassword = async(req, res) => {
    try {
        const {site, username, password, id} = req.body;
        const newPassword = new Password({site, username, password, id});
        const savedResult = await newPassword.save();
        res.send({success: true, result: savedResult});
    } catch(error) {
        res.status(500).json({message: "Error saving password", error});
    }
};

// Remove password
const removePassword = async(req, res) => {
    try {
        const {id} = req.body;
        const delResult = await Password.deleteOne({id});
        if(delResult.deletedCount === 0) {
            res.status(404).json({message: 'Password not found'});
            return;
        }
        res.send({success: true, result: delResult});
    } catch(error) {
        res.status(500).json({message:'Error deleting password', error});
    }
};

module.exports = {getPassword, addPassword, removePassword};