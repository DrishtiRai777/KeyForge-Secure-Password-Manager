const express = require('express');
const { getPassword, addPassword, removePassword } = require('../controllers/passwordController');

const router = express.Router();
router.get('/', getPassword);
router.post('/', addPassword);
router.delete('/', removePassword);

module.exports = router;
