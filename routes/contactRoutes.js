// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/:companyUUID', authenticateUser, contactController.createContact);
router.get('/:companyUUID', authenticateUser, contactController.getAllContacts);
router.get('/:contactId', authenticateUser, contactController.getContactById);
router.put('/:contactId', authenticateUser, contactController.updateContact);
router.delete('/:contactId', authenticateUser, contactController.deleteContact);

module.exports = router;
