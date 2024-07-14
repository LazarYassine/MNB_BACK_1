// controllers/emailCategoryController.js

const emailCategoryModel = require('../models/emailCategoryModel');

// Controller function to get all categories by UserID
const getAllCategoriesByUserId = async (req, res) => {
    const userId = req.query.userId; // Assuming you have the user's ID in the request object
    try {
        const categories = await emailCategoryModel.getAllCategoriesByUserId(userId);
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Controller function to get a category by ID and UserID
const getCategoryByIdAndUserId = async (req, res) => {
    const categoryId = req.params.id;
    const userId = req.userId; // Assuming you have the user's ID in the request object
    try {
        const category = await emailCategoryModel.getCategoryByIdAndUserId(categoryId, userId);
        if (category.length === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json(category[0]);
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Controller function to create a new category
const createCategory = async (req, res) => {
    const categoryData = req.body;
    const userId = req.query.userId; // Assuming you have the user's ID in the request object
    categoryData.userId = userId; // Set UserID from request object
    try {
        await emailCategoryModel.createCategory(categoryData);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Controller function to update a category
const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const userId = req.userId; // Assuming you have the user's ID in the request object
    try {
        await emailCategoryModel.updateCategory(categoryId, categoryData);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Controller function to delete a category
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await emailCategoryModel.deleteCategory(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// Controller function to search categories by name
const searchCategoriesByName = async (req, res) => {
    const searchTerm = req.query.name;
    const userId = req.query.userId; // Assuming you have the user's ID in the request query parameters
    try {
        const categories = await emailCategoryModel.searchCategoriesByName(searchTerm, userId);
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error searching categories by name:', error);
        res.status(500).json({ error: 'Failed to search categories by name' });
    }
};

const searchCategoriesByNameFromBody = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const categories = await emailCategoryModel.searchCategoriesByName(name, userId);
        res.status(200).json(categories[0]);
    } catch (error) {
        console.error('Error searching categories by name:', error);
        res.status(500).json({ error: 'Failed to search categories by name' });
    }
};

module.exports = {
    getAllCategoriesByUserId,
    getCategoryByIdAndUserId,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategoriesByName,
    searchCategoriesByNameFromBody
};
