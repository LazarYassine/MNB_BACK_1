// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { loginUser, loginUserOnlyForPayment } = require('../controllers/authController');

// Login user
router.post('/login', loginUser);
router.post('/login-iofp', loginUserOnlyForPayment);

module.exports = router;
