const express = require('express');
const authenticateUser = require('../middleware/authUserMiddleware');
const { enableTOTP, verifyTOTP, forgetPassword, resetPassword, resetPasswordPage, updatePassword } = require('../controllers/totpController');
const router = express.Router();

// Enable TOTP
router.get('/', authenticateUser, enableTOTP);

// Verify TOTP
router.post('/verify-totp', authenticateUser, verifyTOTP);

// Forgot Password
router.get('/forgetPswd', forgetPassword);

// Password Reset
router.post('/reset-pswd', resetPassword);

// Reset Password Page
router.get('/reset-password', resetPasswordPage);

// Update Password
router.post('/update-password', updatePassword);

module.exports = router;
