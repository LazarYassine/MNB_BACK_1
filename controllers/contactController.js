// controllers/contactController.js

const contactModel = require('../models/contactModel');

const createContact = async (req, res) => {
    const contactData = req.body;
    const companyUUID = req.params.companyUUID;
    try {
        await contactModel.createContact(contactData, companyUUID);
        res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const companyUUID = req.params.companyUUID;
        const contacts = await contactModel.getAllContacts(companyUUID);
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    try {
        const contact = await contactModel.getContactById(contactId);
        if (!contact) {
            res.status(404).json({ error: 'Contact not found' });
        } else {
            res.status(200).json(contact);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const contactData = req.body;
    try {
        await contactModel.updateContact(contactId, contactData);
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update contact' });
    }
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    try {
        await contactModel.deleteContact(contactId);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};
