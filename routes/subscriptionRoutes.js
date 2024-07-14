// routes/subscriptionRoutes.js

const express = require('express');
const router = express.Router();
const { subscribeUser } = require('../controllers/subscriptionController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Subscribe user to a plan
router.post('/subscribe', authenticateUser, subscribeUser);

module.exports = router;
