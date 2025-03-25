const Password = require('../models/passwordSchema');
const {encryptPassword, decryptPassword} = require('../utils/encryption')

// Get all Passwords
const getPassword = async (req, res) => {
    try {
        const passwords = await Password.find({});
        const decryptedPasswords = passwords.map((entry) => ({
            ...entry._doc,
            password: decryptPassword(entry.password),
        }));

        res.json(decryptedPasswords);
    } catch (error) {
        console.error("Error in getPassword:", error); 
        res.status(500).json({ message: "Error fetching passwords", error: error.message });
    }
};


// Add a new Password
const addPassword = async (req, res) => {
    try {
        const { site, username, password, id } = req.body;
        const encryptedPassword = encryptPassword(password); // Encrypt before saving

        const newPassword = new Password({ site, username, password: encryptedPassword, id });
        const savedResult = await newPassword.save();

        res.send({ success: true, result: savedResult });
    } catch (error) {
        res.status(500).json({ message: "Error saving password", error });
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