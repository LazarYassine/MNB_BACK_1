const db = require('../config/dbConfig');

const createSocialMediaAccount = async (companyUUID, accountData) => {
    const { platform, accountName, accountLink } = accountData;
    const insertQuery = `
        INSERT INTO social_media_accounts (company_uuid, platform, account_name, account_url)
        VALUES (?, ?, ?, ?)
    `;
    try {
        const result = await db.query(insertQuery, [companyUUID, platform, accountName, accountLink]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating social media account:', error);
        throw error;
    }
};

const getAllSocialMediaAccounts = async (companyUUID) => {
    const sql = 'SELECT * FROM social_media_accounts WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

const getSocialMediaAccountById = async (companyUUID, accountId) => {
    const sql = 'SELECT * FROM social_media_accounts WHERE company_uuid = ? AND id = ?';
    const [result] = await db.query(sql, [companyUUID, accountId]);
    return result[0];
};

const updateSocialMediaAccount = async (companyUUID, accountId, accountData) => {
    const { platform, accountName, accountLink } = accountData;
    const sql = `
        UPDATE social_media_accounts 
        SET platform = ?, account_name = ?, account_url = ?
        WHERE company_uuid = ? AND id = ?
    `;
    return db.query(sql, [platform, accountName, accountLink, companyUUID, accountId]);
};

const deleteSocialMediaAccount = async (companyUUID, accountId) => {
    const sql = 'DELETE FROM social_media_accounts WHERE company_uuid = ? AND id = ?';
    return db.query(sql, [companyUUID, accountId]);
};

const deleteSocialMediaAccountByCompanyUUID = async (companyUUID) => {
    const sql = 'DELETE FROM social_media_accounts WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

module.exports = {
    createSocialMediaAccount,
    getAllSocialMediaAccounts,
    getSocialMediaAccountById,
    updateSocialMediaAccount,
    deleteSocialMediaAccount,
    deleteSocialMediaAccountByCompanyUUID
};
