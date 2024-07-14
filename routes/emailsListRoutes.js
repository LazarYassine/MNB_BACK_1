const express = require('express');
const router = express.Router();
const emailsListController = require('../controllers/emailsListController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Add a new email to the list
router.post('/', authenticateUser, emailsListController.addEmailToList);

// Edit an existing email in the list
router.put('/:id', authenticateUser, emailsListController.editEmailInList);

// Delete an email from the list
router.delete('/:id', authenticateUser, emailsListController.deleteEmailFromList);

// Get all emails in the list
router.get('/', authenticateUser, emailsListController.getAllEmails);

// Update the status of multiple emails at once
router.put('/updateStatus', authenticateUser, emailsListController.updateStatusOfMultipleEmails);

// Export emails to a CSV file based on criteria
router.get('/export', authenticateUser, emailsListController.exportEmailsToCSV);

// Search emails by multiple criteria
router.get('/search', authenticateUser, emailsListController.searchEmailsByCriteria);

// Add multiple emails to the list at once
router.post('/insert-multiple', authenticateUser, emailsListController.insertMultipleEmailsToList);

// Define route for exporting email list
router.post('/export-email-list', authenticateUser, emailsListController.exportEmailListExcel);

module.exports = router;
