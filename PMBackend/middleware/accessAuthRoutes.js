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

module.exports = {
    checkAuthMiddleware,
}
