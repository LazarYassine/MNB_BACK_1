// controllers/networkCategoryController.js

const networkCategoryModel = require('../models/networkCategoryModel');

const createCategory = async (req, res) => {
    const { companyUUID } = req.params;
    const categoryData = req.body;
    try {
        await networkCategoryModel.createCategory(companyUUID, categoryData);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

const getAllCategories = async (req, res) => {
    const { companyUUID } = req.params;
    try {
        const categories = await networkCategoryModel.getAllCategories(companyUUID);
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const getCategoryByUUID = async (req, res) => {
    const { companyUUID, categoryId } = req.params;
    try {
        const category = await networkCategoryModel.getCategoryById(companyUUID, categoryId);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

const updateCategory = async (req, res) => {
    const { companyUUID, categoryId } = req.params;
    const categoryData = req.body;
    try {
        await networkCategoryModel.updateCategory(companyUUID, categoryId, categoryData);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

const deleteCategory = async (req, res) => {
    const { companyUUID, categoryId } = req.params;
    try {
        await networkCategoryModel.deleteCategory(companyUUID, categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryByUUID,
    updateCategory,
    deleteCategory
};
