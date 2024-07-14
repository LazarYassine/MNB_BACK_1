const socialMediaAccountsModel = require('../models/socialMediaAccountsModel');

const createSocialMediaAccount = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const accountData = req.body;
    try {
        await socialMediaAccountsModel.createSocialMediaAccount(companyUUID, accountData);
        res.status(201).json({ message: 'Social media account created successfully' });
    } catch (error) {
        console.error('Error creating social media account:', error);
        res.status(500).json({ error: 'Failed to create social media account' });
    }
};

const getAllSocialMediaAccounts = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    try {
        const socialMediaAccounts = await socialMediaAccountsModel.getAllSocialMediaAccounts(companyUUID);
        res.status(200).json(socialMediaAccounts[0]);
    } catch (error) {
        console.error('Error fetching social media accounts:', error);
        res.status(500).json({ error: 'Failed to fetch social media accounts' });
    }
};

const getSocialMediaAccountById = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const accountId = req.params.accountId;
    try {
        const account = await socialMediaAccountsModel.getSocialMediaAccountById(companyUUID, accountId);
        if (!account) {
            return res.status(404).json({ error: 'Social media account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error('Error fetching social media account by ID:', error);
        res.status(500).json({ error: 'Failed to fetch social media account by ID' });
    }
};

const updateSocialMediaAccount = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const accountId = req.params.accountId;
    const accountData = req.body;
    try {
        await socialMediaAccountsModel.updateSocialMediaAccount(companyUUID, accountId, accountData);
        res.status(200).json({ message: 'Social media account updated successfully' });
    } catch (error) {
        console.error('Error updating social media account:', error);
        res.status(500).json({ error: 'Failed to update social media account' });
    }
};

const deleteSocialMediaAccount = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const accountId = req.params.accountId;
    try {
        await socialMediaAccountsModel.deleteSocialMediaAccount(companyUUID, accountId);
        res.status(200).json({ message: 'Social media account deleted successfully' });
    } catch (error) {
        console.error('Error deleting social media account:', error);
        res.status(500).json({ error: 'Failed to delete social media account' });
    }
};

module.exports = {
    createSocialMediaAccount,
    getAllSocialMediaAccounts,
    getSocialMediaAccountById,
    updateSocialMediaAccount,
    deleteSocialMediaAccount
};
