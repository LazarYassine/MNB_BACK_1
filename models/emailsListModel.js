// models/emailsListModel.js

const db = require('../config/dbConfig');

// Function to add a new email to the list
const addEmailToList = async (emailData) => {
    const {emailAddress, category_id, is_important } = emailData;
    const sql = 'INSERT INTO emails_list (email_address, category_id, is_important) VALUES (?, ?, ?)';
    return db.query(sql, [emailAddress, category_id, is_important]);
};

// Function to edit an existing email in the list
const editEmailInList = async (emailId, emailData) => {
    const { emailAddress, category_id, is_important } = emailData;
    const sql = 'UPDATE emails_list SET email_address = ?, category_id = ?, is_important = ? WHERE email_id = ?';
    return db.query(sql, [emailAddress, category_id, is_important, emailId]);
};

// Function to delete an email from the list
const deleteEmailFromList = async (emailId) => {
    const sql = 'DELETE FROM emails_list WHERE email_id = ?';
    return db.query(sql, [emailId]);
};

// Function to update the status of multiple emails at once
const updateStatusOfMultipleEmails = async (emailIds, newStatus) => {
    const sql = 'UPDATE emails_list SET is_important = ? WHERE email_id IN (?)';
    return db.query(sql, [newStatus, emailIds]);
};

// Function to export emails to a CSV file based on criteria
const exportEmailsToCSV = async (categoryId, isImportant) => {
    let sql = 'SELECT email_address FROM emails_list WHERE 1=1';
    const params = [];

    if (categoryId) {
        sql += ' AND category_id = ?';
        params.push(categoryId);
    }

    if (isImportant !== undefined) {
        sql += ' AND is_important = ?';
        params.push(isImportant);
    }

    const emails = await db.query(sql, params);
    // Convert emails to CSV format
    const csvData = emails.map(email => email.email_address).join('\n');
    return csvData;
};

// Function to search emails by multiple criteria
const searchEmailsByCriteria1 = async (categoryId, isImportant, name) => {
    let sql = 'SELECT * FROM emails_list WHERE 1=1';
    const params = [];

    if (categoryId) {
        sql += ' AND category_id = ?';
        params.push(categoryId);
    }

    if (isImportant !== undefined) {
        sql += ' AND is_important = ?';
        params.push(isImportant);
    }

    if (name) {
        sql += ' AND email_address LIKE ?';
        params.push(`%${name}%`);
    }

    return db.query(sql, params);
};

const searchEmailsByCriteria = async (categoryId, status, searchTerm, userId, page, pageSize) => {
    // Calculate offset based on page number and page size
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);
    
    // Base SQL query to retrieve emails and their associated categories
    let sql = 'SELECT el.*, elc.category_name FROM emails_list el INNER JOIN emails_list_categories elc ON el.category_id = elc.id WHERE elc.UserID = ?';
    const values = [userId];
    
    // Conditionally filter by category ID
    if (categoryId !== "" ) {
        sql += ' AND el.category_id = ?';
        values.push(categoryId);
    }
    // Conditionally filter by email status
    if (status !== "") {
        sql += ' AND el.is_important = ?';
        values.push(status);
    }
    
    // Conditionally filter by search term in email address
    if (searchTerm !== "") {
        sql += ' AND el.email_address LIKE ?';
        values.push(`%${searchTerm}%`);
    }
    
    // Add pagination parameters
    sql += ' LIMIT ?, ?';
    values.push(offset, limit);
    
    // Query to retrieve the total count of emails
    let countSql = 'SELECT COUNT(*) as total FROM emails_list el INNER JOIN emails_list_categories elc ON el.category_id = elc.id WHERE elc.UserID = ?';
    
    // Apply the same conditions for counting emails
    if (categoryId !== "" ) {
        countSql += ' AND el.category_id = ?';
    }
    if (status !== "") {
        countSql += ' AND el.is_important = ?';
    }
    if (searchTerm !== "") {
        countSql += ' AND el.email_address LIKE ?';
    }

    // Execute the count query
    const countResult = await db.query(countSql, values);
    const total = countResult[0][0].total;
    
    // Execute the main SQL query to fetch paginated emails
    const emails = await db.query(sql, values);
    
    // Return the paginated list of emails along with metadata
    return { emails, total, currentPage: page, pageSize };
};


const filterEmailsWithoutPagination = async (categoryId, status, searchTerm, userId) => {
    

    // Base SQL query to retrieve emails and their associated categories
    let sql = 'SELECT el.*, elc.category_name FROM emails_list el INNER JOIN emails_list_categories elc ON el.category_id = elc.id WHERE elc.UserID = ?';
    const values = [userId];
    
    // Conditionally filter by category ID
    if (categoryId !== "" && categoryId != undefined ) {
        sql += ' AND el.category_id = ?';
        values.push(categoryId);
    }
    // Conditionally filter by email status
    if (status !== "" && status != undefined) {
        sql += ' AND el.is_important = ?';
        values.push(status);
    }
    
    // Conditionally filter by search term in email address
    if (searchTerm !== "" && searchTerm != undefined) {
        sql += ' AND el.email_address LIKE ?';
        values.push(`%${searchTerm}%`);
    }
    // Execute the main SQL query to fetch paginated emails
    const emails = await db.query(sql, values);
    
    // Return the paginated list of emails along with metadata
    return emails;
};





// Function to get all emails
const getAllEmails = async () => {
    // this is not correct
    const sql = 'SELECT * FROM emails_list';
    return db.query(sql);
};

// Model function to insert an email into the list
const insertEmailToList = async (emailAddress, categoryId, isImportant) => {
    const sql = 'INSERT INTO emails_list (email_address, category_id, is_important) VALUES (?, ?, ?)';
    await db.query(sql, [emailAddress, categoryId, isImportant]);
};

module.exports = {
    addEmailToList,
    editEmailInList,
    deleteEmailFromList,
    updateStatusOfMultipleEmails,
    exportEmailsToCSV,
    searchEmailsByCriteria,
    getAllEmails,
    insertEmailToList,
    filterEmailsWithoutPagination
};
