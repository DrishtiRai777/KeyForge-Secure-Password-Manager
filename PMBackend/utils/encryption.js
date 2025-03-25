const crypto = require("crypto");
require("dotenv").config();
const algorithm = "aes-256-cbc"; 
console.log(process.env.ENCRYPTION_KEY);
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); 

// Encrypt Function
function encryptPassword(password) {
    const iv = crypto.randomBytes(16); // Always 16 bytes IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

// Decrypt Password
function decryptPassword(encryptedPassword) {
    const parts = encryptedPassword.split(":");
    if (parts.length !== 2) {
        throw new Error("Invalid encrypted password format");
    }

    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = parts[1];

    if (iv.length !== 16) {
        throw new Error("Invalid IV length: IV must be 16 bytes long");
    }

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}


module.exports = {
    encryptPassword,
    decryptPassword
} 