const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Routes for services under a specific company
router.post('/:companyUUID', authenticateUser, servicesController.createService);
router.get('/:companyUUID', authenticateUser, servicesController.getAllServices);
router.get('/:companyUUID/:serviceId', authenticateUser, servicesController.getServiceByUUID);
router.put('/:companyUUID/:serviceId', authenticateUser, servicesController.updateService);
router.delete('/:companyUUID/:serviceId', authenticateUser, servicesController.deleteService);

module.exports = router;
