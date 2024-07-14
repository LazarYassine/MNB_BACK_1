// controllers/emailsListController.js

const emailsListModel = require('../models/emailsListModel');
const ExcelJS = require('exceljs');
const fs = require('fs');


// Controller function to add a new email to the list
const addEmailToList = async (req, res) => {
    const emailData = req.body;
    try {
        await emailsListModel.addEmailToList(emailData);
        res.status(201).json({ message: 'Email added successfully' });
    } catch (error) {
        console.error('Error adding email:', error);
        res.status(500).json({ error: 'Failed to add email' });
    }
};

// Controller function to edit an existing email in the list
const editEmailInList = async (req, res) => {
    const emailId = req.params.id;
    const emailData = req.body;
    try {
        await emailsListModel.editEmailInList(emailId, emailData);
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ error: 'Failed to update email' });
    }
};

// Controller function to delete an email from the list
const deleteEmailFromList = async (req, res) => {
    const emailId = req.params.id;
    try {
        await emailsListModel.deleteEmailFromList(emailId);
        res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        res.status(500).json({ error: 'Failed to delete email' });
    }
};

// Controller function to update the status of multiple emails at once
const updateStatusOfMultipleEmails = async (req, res) => {
    const emailIds = req.body.emailIds;
    const newStatus = req.body.newStatus;
    try {
        await emailsListModel.updateStatusOfMultipleEmails(emailIds, newStatus);
        res.status(200).json({ message: 'Status updated successfully for multiple emails' });
    } catch (error) {
        console.error('Error updating status for multiple emails:', error);
        res.status(500).json({ error: 'Failed to update status for multiple emails' });
    }
};

// Controller function to export emails to a CSV file based on criteria
const exportEmailsToCSV = async (req, res) => {
    const categoryId = req.query.categoryId;
    const isImportant = req.query.isImportant;
    try {
        const csvData = await emailsListModel.exportEmailsToCSV(categoryId, isImportant);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=emails.csv');
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Error exporting emails to CSV:', error);
        res.status(500).json({ error: 'Failed to export emails to CSV' });
    }
};

// Controller function to search emails by multiple criteria
const searchEmailsByCriteria1 = async (req, res) => {
    const categoryId = req.query.categoryId;
    const isImportant = req.query.isImportant;
    const name = req.query.name;
    try {
        const emails = await emailsListModel.searchEmailsByCriteria(categoryId, isImportant, name);
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error searching emails by criteria:', error);
        res.status(500).json({ error: 'Failed to search emails by criteria' });
    }
};

// Controller function to search emails by multiple criteria with pagination
const searchEmailsByCriteria = async (req, res) => {
    const { categoryId, status, searchTerm, page, pageSize, userId } = req.query;
    
    try {
        const result = await emailsListModel.searchEmailsByCriteria(categoryId, status, searchTerm, userId, page, pageSize);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        console.error('Error searching emails by criteria:', error);
        res.status(500).json({ error: 'Failed to search emails by criteria' });
    }
};


// Controller function to get all emails
const getAllEmails = async (req, res) => {
    try {
        const emails = await emailsListModel.getAllEmails();
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
};

// Controller function to insert multiple emails into the list at once
const insertMultipleEmailsToList = async (req, res) => {
    const { emailAddresses, categoryId, isImportant } = req.body;

    try {
        // Check if the email addresses array is provided
        if (!Array.isArray(emailAddresses) || emailAddresses.length === 0) {
            return res.status(400).json({ error: 'Email addresses array is required and cannot be empty' });
        }

        // Insert each email into the database with the provided category ID and isImportant flag
        await Promise.all(emailAddresses.map(async (emailAddress) => {
            await emailsListModel.insertEmailToList(emailAddress, categoryId, isImportant);
        }));

        res.status(201).json({ message: 'Emails inserted successfully' });
    } catch (error) {
        console.error('Error inserting emails:', error);
        res.status(500).json({ error: 'Failed to insert emails' });
    }
};

const exportEmailListExcel = async (req, res) => {
    try {
        // Retrieve email list based on criteria (criteria should come from request)
        const { categoryId, status, searchTerm, page, pageSize, userId } = req.body;
        const emails = await emailsListModel.filterEmailsWithoutPagination(categoryId, status, searchTerm, userId);

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Email List');

        // Add headers
        worksheet.addRow(['Email Address', 'Category', 'Importance']); // Add your desired headers

        // Add data rows
        emails[0].forEach(email => {
            // Define symbol based on is_important value
            let importanceSymbol = '';
            if (email.is_important === 1) {
                importanceSymbol = '★'; // Golden star symbol for important emails
            } else {
                importanceSymbol = '●'; // Circle symbol for other emails
            }

            worksheet.addRow([email.email_address, email.category_name, importanceSymbol]); // Adjust column names based on your schema
        });

        // Style the worksheet if needed
        // For example, apply conditional formatting
        const rule = {
            type: 'expression',
            formula: 'C1 = "⭐"', // Assuming 'Importance' column is C
            // style: {
            //     fill: {
            //         type: 'pattern',
            //         pattern: 'solid',
            //         fgColor: { argb: 'FFFFD700' } // Golden color for important emails
            //     }
            // }
        };
        // worksheet.addConditionalFormattingRule('C2:C1000', rule); // Adjust the range as per your data

        // Generate a unique filename
        const filename = `email_list_${Date.now()}.xlsx`;

        // Save the workbook to a file
        await workbook.xlsx.writeFile(filename);

        // Send the file as a response
        res.download(filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }

            // Delete the file after it's been sent
            fs.unlinkSync(filename);
        });
    } catch (err) {
        console.error('Error exporting email list:', err);
        res.status(500).send('Error exporting email list');
    }
};

module.exports = {
    addEmailToList,
    editEmailInList,
    deleteEmailFromList,
    updateStatusOfMultipleEmails,
    exportEmailsToCSV,
    searchEmailsByCriteria,
    getAllEmails,
    insertMultipleEmailsToList,
    exportEmailListExcel
};
