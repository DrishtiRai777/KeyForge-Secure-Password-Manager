const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) return res.status(401).json({ message: 'No access token' });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid access token' });

        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
