// achievementRoutes.js

const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Define routes
router.get('/:companyUUID', authenticateUser, achievementController.getAllAchievements);
router.post('/:companyUUID', authenticateUser, achievementController.createAchievement);
router.put('/:companyUUID/:achievementId', authenticateUser, achievementController.updateAchievement);
router.delete('/:companyUUID/:achievementId', authenticateUser, achievementController.deleteAchievement);

module.exports = router;
