// models/emailCategoryModel.js

const db = require('../config/dbConfig');

// Function to get all categories by UserID
const getAllCategoriesByUserId = async (userId) => {
    const sql = 'SELECT * FROM emails_list_categories WHERE UserID = ?';
    return db.query(sql, [userId]);
};

// Function to get a category by ID and UserID
const getCategoryByIdAndUserId = async (categoryId, userId) => {
    const sql = 'SELECT * FROM emails_list_categories WHERE id = ? AND UserID = ?';
    return db.query(sql, [categoryId, userId]);
};

// Function to create a new category
const createCategory = async (categoryData) => {
    const { categoryName, borderColor, userId } = categoryData;
    const sql = 'INSERT INTO emails_list_categories (category_name, border_color, UserID) VALUES (?, ?, ?)';
    return db.query(sql, [categoryName, borderColor, userId]);
};

// Function to update a category
const updateCategory = async (categoryId, categoryData) => {
    const { categoryName, borderColor, userId } = categoryData;
    const sql = 'UPDATE emails_list_categories SET category_name = ?, border_color = ? WHERE id = ?';
    return db.query(sql, [categoryName, borderColor, categoryId, userId]);
};

// Function to delete a category
const deleteCategory = async (categoryId) => {
    const sql = 'DELETE FROM emails_list_categories WHERE id = ?';
    return db.query(sql, [categoryId]);
};

// Function to search categories by name (using LIKE) and UserID
const searchCategoriesByName = async (searchTerm, userId) => {
    // Convert searchTerm to lowercase and remove leading/trailing spaces
    searchTerm = searchTerm.toLowerCase().trim();
    // Prepare the SQL query to search for category names containing the searchTerm (case-insensitive)
    const sql = 'SELECT * FROM emails_list_categories WHERE LOWER(category_name) LIKE ? AND UserID = ?';
    // Execute the query
    return db.query(sql, [`%${searchTerm}%`, userId]);
};


module.exports = {
    getAllCategoriesByUserId,
    getCategoryByIdAndUserId,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategoriesByName
};
