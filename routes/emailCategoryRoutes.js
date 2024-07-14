// routes/emailCategoryRoutes.js

const express = require('express');
const router = express.Router();
const emailCategoryController = require('../controllers/emailCategoryController');

// Middleware to authenticate user (assuming you have authentication middleware)
// const authenticateUser = require('../middlewares/authenticateUser');

// // Routes
// router.get('/', authenticateUser, emailCategoryController.getAllCategoriesByUserId);
// router.get('/:id', authenticateUser, emailCategoryController.getCategoryByIdAndUserId);
// router.post('/', authenticateUser, emailCategoryController.createCategory);
// router.put('/:id', authenticateUser, emailCategoryController.updateCategory);
// router.delete('/:id', authenticateUser, emailCategoryController.deleteCategory);
// router.get('/search', authenticateUser, emailCategoryController.searchCategoriesByName)

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Routes
router.get('/', authenticateUser, emailCategoryController.getAllCategoriesByUserId);
router.get('/:id', authenticateUser, emailCategoryController.getCategoryByIdAndUserId);
router.post('/', authenticateUser, emailCategoryController.createCategory);
router.put('/:id', authenticateUser, emailCategoryController.updateCategory);
router.delete('/:id', authenticateUser, emailCategoryController.deleteCategory);
// router.get('/search', emailCategoryController.searchCategoriesByName);
router.post('/search', authenticateUser, emailCategoryController.searchCategoriesByNameFromBody);

module.exports = router;
