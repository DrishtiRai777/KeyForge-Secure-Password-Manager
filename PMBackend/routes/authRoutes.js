const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const {checkAuthMiddleware} = require("../middleware/accessAuthRoutes"); 

router.get("/login", checkAuthMiddleware, (req, res) => { 
    res.json({ authenticated: true });
});

router.get("/register", checkAuthMiddleware, (req, res) => {
    res.json({ authenticated: true });
})

router.post('/register', register);
router.post('/login', login);

module.exports = router;
