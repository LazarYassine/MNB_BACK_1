const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');


router.get('/:companyUUID', authenticateUser, projectController.getAllProjectsByCompany);
router.get('/:companyUUID/:projectId', authenticateUser, projectController.getProjectById);
router.post('/:companyUUID', authenticateUser, projectController.createProject);
router.put('/:companyUUID/:projectId', authenticateUser, projectController.updateProject);
router.delete('/:companyUUID/:projectId', authenticateUser, projectController.deleteProject);

module.exports = router;
