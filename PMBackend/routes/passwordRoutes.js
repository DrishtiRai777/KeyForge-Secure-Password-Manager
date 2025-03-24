const express = require('express');
const { getPassword, addPassword, removePassword } = require('../controllers/passwordController');
const { authenticate } = require('../middleware/refreshTokenMiddleware');

const router = express.Router();
router.get('/', authenticate, getPassword);
router.post('/', authenticate, addPassword);
router.delete('/', authenticate, removePassword);

module.exports = router;
