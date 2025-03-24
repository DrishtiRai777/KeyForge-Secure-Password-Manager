const jwt = require("jsonwebtoken");
const Token = require("../models/tokenSchema");
const { generateAccessToken } = require("../utils/generateTokens");

const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return await refreshAccessToken(req, res, next);

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
                return next();
            }
            return refreshAccessToken(req, res, next);
        });
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json([]);

        const storedToken = await Token.findOne({ token: refreshToken });
        if (!storedToken) return res.status(401).json([]);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json([]);

            const newAccessToken = await generateAccessToken({ id: user.id }); // Ensure async
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Only secure in production
                sameSite: "Strict",
                maxAge: 15 * 60 * 1000,
            });

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Refresh Token Error:", error);
        return res.status(500).json([]);
    }
};

module.exports = { authenticate };
