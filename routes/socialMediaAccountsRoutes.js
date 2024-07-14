const express = require('express');
const router = express.Router();
const socialMediaAccountsController = require('../controllers/socialMediaAccountsController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Routes for social media accounts under a specific company
router.post('/:companyUUID', authenticateUser, socialMediaAccountsController.createSocialMediaAccount);
router.get('/:companyUUID', authenticateUser, socialMediaAccountsController.getAllSocialMediaAccounts);
router.get('/:companyUUID/:accountId', authenticateUser, socialMediaAccountsController.getSocialMediaAccountById);
router.put('/:companyUUID/:accountId', authenticateUser, socialMediaAccountsController.updateSocialMediaAccount);
router.delete('/:companyUUID/:accountId', authenticateUser, socialMediaAccountsController.deleteSocialMediaAccount);

module.exports = router;
