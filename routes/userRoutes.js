// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, getUserById, updateUser, getUserSubscriptionDetailsById, checkUserEmailExistence, updateUserPlan } = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);
router.get('/:id', getUserById);
router.get('/subscription-details/:id', getUserSubscriptionDetailsById);
router.put('/update-user', updateUser);
router.post('/check-email-existence', checkUserEmailExistence);
router.put('/plan-user-plan', updateUserPlan);

module.exports = router;
