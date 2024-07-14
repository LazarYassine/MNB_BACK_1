// routes/networkCategoryRoutes.js

const express = require('express');
const router = express.Router();
const networkCategoryController = require('../controllers/networkCategoryController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/:companyUUID', authenticateUser, networkCategoryController.createCategory);
router.get('/:companyUUID', authenticateUser, networkCategoryController.getAllCategories);
router.get('/:companyUUID/:categoryId', authenticateUser, networkCategoryController.getCategoryByUUID);
router.put('/:companyUUID/:categoryId', authenticateUser, networkCategoryController.updateCategory);
router.delete('/:companyUUID/:categoryId', authenticateUser, networkCategoryController.deleteCategory);

module.exports = router;
