const Token = require('../models/tokenSchema');
const { generateAccessToken } = require('../utils/generateTokens');

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

    const storedToken = await Token.findOne({ token: refreshToken });
    if (!storedToken) return res.status(401).json({ message: 'Invalid refresh token' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid refresh token' });

        const newAccessToken = generateAccessToken({ id: user.id });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: 'Access token refreshed' });
    });
};

module.exports = { refreshAccessToken };
