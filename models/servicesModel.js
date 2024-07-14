const db = require('../config/dbConfig');

// Function to create a new service
const createService = async (companyUUID, serviceData) => {
    const { title, description, borderColor } = serviceData;
    const insertQuery = `
        INSERT INTO service (company_uuid, Title, Description, BorderColor)
        VALUES (?, ?, ?, ?)
    `;
    try {
        const result = await db.query(insertQuery, [companyUUID, title, description, borderColor]);
        return result.insertId; // Return the insertId
    } catch (error) {
        console.error('Error creating service:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};

// Function to get all services for a specific company
const getAllServices = async (companyUUID) => {
    const sql = 'SELECT * FROM service WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

// Function to get a service by its ID and for a specific company
const getServiceByUUID = async (companyUUID, serviceId) => {
    const sql = 'SELECT * FROM service WHERE company_uuid = ? AND ServiceID = ?';
    const [result] = await db.query(sql, [companyUUID, serviceId]);
    return result[0];
};

// Function to update a service by its ID and for a specific company
const updateService = async (companyUUID, serviceId, serviceData) => {
    const { title, description, borderColor } = serviceData;
    const sql = `
        UPDATE service 
        SET Title = ?, Description = ?, BorderColor = ?
        WHERE company_uuid = ? AND ServiceID = ?
    `;
    return db.query(sql, [title, description, borderColor, companyUUID, serviceId]);
};

// Function to delete a service by its ID and for a specific company
const deleteService = async (companyUUID, serviceId) => {
    const sql = 'DELETE FROM service WHERE company_uuid = ? AND ServiceID = ?';
    return db.query(sql, [companyUUID, serviceId]);
};

const deleteServiceByCompanyUUID = async (companyUUID) => {
    const sql = 'DELETE FROM service WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

module.exports = {
    createService,
    getAllServices,
    getServiceByUUID,
    updateService,
    deleteService,
    deleteServiceByCompanyUUID
};
