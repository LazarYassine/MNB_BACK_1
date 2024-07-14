// models/networkCategoryModel.js

const db = require('../config/dbConfig');

const createCategory = async (companyUUID, categoryData) => {
    const { name, description, borderColor } = categoryData;
    const sql = `
        INSERT INTO networkcategory (company_uuid, Name, Description, BorderColor)
        VALUES (?, ?, ?, ?)
    `;
    return db.query(sql, [companyUUID, name, description, borderColor]);
};

const getAllCategories = async (companyUUID) => {
    const sql = 'SELECT * FROM networkcategory WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

const getCategoryById = async (companyUUID, categoryId) => {
    const sql = 'SELECT * FROM networkcategory WHERE company_uuid = ? AND CategoryID = ?';
    const [results] = await db.query(sql, [companyUUID, categoryId]);
    return results[0];
};

const updateCategory = async (companyUUID, categoryId, categoryData) => {
    const { name, description, borderColor } = categoryData;
    const sql = `
        UPDATE networkcategory 
        SET Name = ?, Description = ?, BorderColor = ?
        WHERE company_uuid = ? AND CategoryID = ?
    `;
    return db.query(sql, [name, description, borderColor, companyUUID, categoryId]);
};

const deleteCategory = async (companyUUID, categoryId) => {
    const sql = 'DELETE FROM networkcategory WHERE company_uuid = ? AND CategoryID = ?';
    return db.query(sql, [companyUUID, categoryId]);
};

const deleteCategoryByCompanyUUID = async (companyUUID) => {
    const sql = 'DELETE FROM networkcategory WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteCategoryByCompanyUUID
};
