const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// register User
router.post('/register', authController.register);

// login User
router.post('/login', authController.login);

module.exports = router;
