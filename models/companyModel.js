// models/companyModel.js

const db = require('../config/dbConfig');

// Function to get all companies
const getAllCompanies = async (userId) => {
    const sql = 'SELECT * FROM company WHERE UserID = ?';
    return db.query(sql, [userId]);
};

// Function to get a company by ID
const getCompanyById = async (companyId) => {
    const sql = 'SELECT * FROM company WHERE companyId = ?';
    return db.query(sql, [companyId]);
};

// Function to get a company by UUID
const getCompanyByUUID = async (companyUUID) => {
    const sql = 'SELECT * FROM company WHERE uuid = ?';
    return db.query(sql, [companyUUID]);
};

// Function to get a company by companyName
const getCompanyByName = async (companyName) => {
    const sql = "SELECT * FROM company WHERE companyname like '%?%' ";
    return db.query(sql, [companyName]);
};

const createCompany1 = async (companyData) => {
    const { companyName, industry, location, foundedYear, size, description, contactEmail, UserID } = companyData;
    const checkQuery = `
        SELECT COUNT(*) AS count FROM company WHERE companyName = ?
    `;
    const insertQuery = `
        INSERT INTO company (companyName, industry, location, foundedYear, size, description, contactEmail, UserID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        // Check if a company with the same name already exists
        const [existingCompany] = await db.query(checkQuery, [companyName]);
        if (existingCompany[0].count > 0) {
            throw new Error('Company with the same name already exists');
        }

        // Insert the new company if it doesn't already exist
        const result = await db.query(insertQuery, [companyName, industry, location, foundedYear, size, description, contactEmail, UserID]);
        return result.insertId; // Return the insertId
    } catch (error) {
        console.error('Error creating company:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};

const createCompany = async (companyData) => {
    const { companyName, industry, location, foundedYear, size, description, contactEmail, UserID } = companyData;
    const checkQuery = `
        SELECT COUNT(*) AS count FROM company WHERE companyName = ?
    `;
    const insertQuery = `
        INSERT INTO company (companyName, industry, location, foundedYear, size, description, contactEmail, UserID, uuid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, UUID())
    `;
    try {
        // Check if a company with the same name already exists
        const [existingCompany] = await db.query(checkQuery, [titleCase(companyName)]);
        if (existingCompany[0].count > 0) {
            throw new Error('Company with the same name already exists');
        }

        // Insert the new company if it doesn't already exist
        const result = await db.query(insertQuery, [titleCase(companyName), industry, location, foundedYear, size, description, contactEmail, UserID]);
        return result.insertId; // Return the insertId
    } catch (error) {
        console.error('Error creating company:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};


// Function to update a company by ID
const updateCompany = async (companyId, companyData) => {
    const { companyName, industry, location, foundedYear, size, description, contactEmail } = companyData;
    const sql = `
        UPDATE company 
        SET companyName = ?, industry = ?, location = ?, foundedYear = ?, size = ?, description = ?, contactEmail = ?
        WHERE CompanyID = ?
    `;
    return db.query(sql, [titleCase(companyName), industry, location, foundedYear, size, description, contactEmail, companyId]);
};

// Function to delete a company by ID
const deleteCompany = async (companyUUID) => {
    const sql = 'DELETE FROM company WHERE uuid = ?';
    return db.query(sql, [companyUUID]);
};


// Function to update a company's logo by UUID
const updateCompanyLogo = async (companyUUID, fileName) => {
    const sql = 'UPDATE company SET LogoURL = ? WHERE uuid = ?';
    return db.query(sql, [fileName, companyUUID]);
};

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    getCompanyByUUID,
    getCompanyByName,
    createCompany,
    updateCompany,
    deleteCompany,
    updateCompanyLogo
};
