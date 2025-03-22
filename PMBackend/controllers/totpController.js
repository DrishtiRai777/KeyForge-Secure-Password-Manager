const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const TOTP = require('../models/totpSchema');
const tempTOTP = require('../models/tempTotpSchema');
const User = require('../models/userSchema');

// Enable TOTP
const enableTOTP = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret();
        await tempTOTP.create({ userId: req.userId, secret: secret.base32 });

        qrcode.toDataURL(secret.otpauth_url, (err, qrCodeUrl) => {
            if (err) return res.status(500).json({ error: "Error generating QR code" });
            res.json({ qrCodeUrl });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Verify TOTP
const verifyTOTP = async (req, res) => {
    try {
        const { totpCode } = req.body;
        const tempSecretEntry = await tempTOTP.findOne({ userId: req.userId });

        if (!tempSecretEntry) return res.status(400).json({ error: "Session expired. Try again." });

        const isValid = speakeasy.totp.verify({
            secret: tempSecretEntry.secret,
            encoding: 'base32',
            token: totpCode
        });

        if (!isValid) return res.status(400).json({ error: "Invalid TOTP Code. Try again." });

        await TOTP.create({ userId: req.userId, totpSecret: tempSecretEntry.secret });
        await tempTOTP.deleteOne({ userId: req.userId });

        res.json({ message: "TOTP enabled successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Forgot Password
const forgetPassword = (req, res) => {
    res.json({ message: "Forgot Password page" });
};

// Password Reset
const resetPassword = async (req, res) => {
    try {
        const { email, totp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User doesn't exist" });

        const secretKey = await TOTP.findOne({ userId: user._id });
        if (!secretKey) return res.status(400).json({ error: "Please turn on 2FA" });

        const isValid = speakeasy.totp.verify({
            secret: secretKey.totpSecret,
            encoding: 'base32',
            token: totp,
            window: 2
        });

        if (!isValid) return res.status(400).json({ error: "Invalid TOTP Code" });

        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        );

        res.json({ resetToken });
    } catch (err) {
        res.status(500).json({ error: "Can't Reset Password! Please Try Again." });
    }
};

// Reset Password Page
const resetPasswordPage = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ token, message: "Reset Password Page" });
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired link" });
    }
};

// Update Password
const updatePassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
        return res.status(400).json({ error: "Passwords do not match", token });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

        res.json({ message: "Password successfully updated" });
    } catch (err) {
        res.status(500).json({ error: "Invalid or expired reset link" });
    }
};

module.exports = {
    enableTOTP,
    verifyTOTP,
    forgetPassword,
    resetPassword,
    resetPasswordPage,
    updatePassword
};
