const jwt = require('jsonwebtoken');
const Token = require('../models/tokenSchema');

const checkAuthMiddleware = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        return res.json({ authenticated: false });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.json({ authenticated: false });
        }
        req.user = user; 
        next();
    });
};

async function validateRefreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

        // Check if refresh token exists in DB
        const storedToken = await Token.findOne({ token: refreshToken });
        if (!storedToken) return res.status(401).json({ error: "Unauthorized" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid token" });
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    checkAuthMiddleware,
    validateRefreshToken
}
