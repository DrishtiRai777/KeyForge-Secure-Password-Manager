const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const Token = require('../models/tokenSchema');
const {checkAuthMiddleware, validateRefreshToken} = require("../middleware/accessAuthRoutes"); 

router.get("/login", checkAuthMiddleware, (req, res) => { 
    res.json({ authenticated: true });
});

router.get("/register", checkAuthMiddleware, (req, res) => {
    res.json({ authenticated: true });
})

router.post("/logout", validateRefreshToken, async (req, res) => {
    try {
        await Token.findOneAndDelete({ userId: req.user.id });

        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
        res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "Strict" });

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/register', register);
router.post('/login', login);

module.exports = router;
