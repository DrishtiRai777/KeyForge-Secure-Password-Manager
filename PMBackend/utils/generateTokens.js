const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

function generateUserIdToken(user) {
    return jwt.sign(user, process.env.USERID_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = { generateAccessToken, generateRefreshToken, generateUserIdToken };
