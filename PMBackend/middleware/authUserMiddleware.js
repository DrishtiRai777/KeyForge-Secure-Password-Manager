const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
    if(!req.cookies) {
        return res.status(401).json({ error: "No cookies found" });
    }
    const token = req.cookies.auth_token;

    if(!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

    try{
        const decoded = jwt.verify(token, process.env.USERID_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token Verification Failed:", error.message);
        return res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = authenticateUser;