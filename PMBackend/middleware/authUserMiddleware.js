const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) return res.redirect('/register');

    try {
        const decoded = jwt.verify(token, process.env.USERID_TOKEN_SECRET);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        res.redirect('/register');
    }
}

module.exports = authenticateUser;
