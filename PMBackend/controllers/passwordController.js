const Password = require('../models/passwordSchema');
const CryptoJS = require("crypto-js");
require("dotenv").config();
// const secretKey = "123";
console.log("Encryption Key:", process.env.ENCRYPTION_KEY);
const secretKey = process.env.ENCRYPTION_KEY; // Load key

// Get all Passwords
const getPassword = async (req, res) => {
    try {
        const passwords = await Password.find({});

        // Decrypt each password
        const decryptedPasswords = passwords.map((entry) => ({
            ...entry._doc,
            password: CryptoJS.AES.decrypt(entry.password, secretKey).toString(CryptoJS.enc.Utf8),
        }));

        res.json(decryptedPasswords);
    } catch (error) {
        res.status(500).json({ message: "Error fetching passwords", error });
    }
};


// Add a new Password
const addPassword = async (req, res) => {
    try {
        const { site, username, password, id } = req.body;

        // Encrypt password before saving
        const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

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