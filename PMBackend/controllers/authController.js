const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const { generateAccessToken, generateRefreshToken, generateUserIdToken } = require('../utils/generateTokens');
const Token = require('../models/tokenSchema');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const payload = { id: newUser._id };
        const userIdToken = generateUserIdToken(payload);
        res.cookie('auth_token', userIdToken, { httpOnly: true, secure: false });
        res.status(201).json({ message: 'User registered', userIdToken });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'Email not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Incorrect password' });

        const payload = { id: user._id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await saveToken(user._id, refreshToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveToken = async (userId, refreshToken) => {
    await Token.findOneAndDelete({ userId });
    const newToken = new Token({ userId, token: refreshToken, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
    await newToken.save();
};

module.exports = { register, login };
