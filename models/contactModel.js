// models/contactModel.js

const db = require('../config/dbConfig');

const createContact = async (contactData, companyUUID) => {
    const { CategoryID, Name, Email, Phone } = contactData;
    const sql = `
        INSERT INTO contact (CategoryID, Name, Email, Phone, companyUUID)
        VALUES (?, ?, ?, ?, ?)
    `;
    return db.query(sql, [CategoryID, Name, Email, Phone, companyUUID]);
};

const getAllContacts = async (companyUUID) => {
    const sql = `
        SELECT
            c.ContactID AS ContactID,
            c.CategoryID AS CategoryID,
            c.Name AS ContactName,
            c.Email AS ContactEmail,
            c.Phone AS ContactPhone,
            nc.Name AS CategoryName,
            nc.BorderColor AS CategoryBorderColor
        FROM
            contact c
        INNER JOIN networkcategory nc ON
            nc.CategoryID = c.CategoryID
        WHERE c.companyUUID = ?
    `;
    return db.query(sql, [companyUUID]);
};


const getContactById = async (contactId) => {
    const sql = 'SELECT * FROM contact WHERE ContactID = ?';
    const [results] = await db.query(sql, [contactId]);
    return results[0];
};

const updateContact = async (contactId, contactData) => {
    const { Name, Email, Phone, CategoryID } = contactData;
    const sql = `
        UPDATE contact 
        SET Name = ?, Email = ?, Phone = ?, CategoryID = ?
        WHERE ContactID = ?
    `;
    return db.query(sql, [Name, Email, Phone, CategoryID, contactId]);
};

const deleteContact = async (contactId) => {
    const sql = 'DELETE FROM contact WHERE ContactID = ?';
    return db.query(sql, [contactId]);
};

const deleteContactByUUID = async (companyUUID) => {
    const sql = 'DELETE FROM contact WHERE companyUUID = ?';
    return db.query(sql, [companyUUID]);
}

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
    deleteContactByUUID
};
