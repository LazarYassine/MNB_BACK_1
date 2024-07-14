// achievementModel.js

const db = require('../config/dbConfig');

// Function to get all achievements for a company
const getAllAchievements = async (companyUUID) => {
    const sql = 'SELECT * FROM achievement WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

// Function to create a new achievement
const createAchievement = async (companyUUID, achievementData) => {
    const { Title } = achievementData;
    const sql = 'INSERT INTO achievement (company_uuid, Title) VALUES (?, ?)';
    return db.query(sql, [companyUUID, Title]);
};

// Function to update an achievement
const updateAchievement = async (companyUUID, achievementId, achievementData) => {
    const { Title } = achievementData;
    const sql = 'UPDATE achievement SET Title = ? WHERE AchievementID = ? AND company_uuid = ?';
    return db.query(sql, [Title, achievementId, companyUUID]);
};

// Function to delete an achievement
const deleteAchievement = async (companyUUID, achievementId) => {
    const sql = 'DELETE FROM achievement WHERE AchievementID = ? AND company_uuid = ?';
    return db.query(sql, [achievementId, companyUUID]);
};

// Function to delete an achievement
const deleteAchievementByCompanyUUID = async (companyUUID) => {
    const sql = 'DELETE FROM achievement WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

module.exports = {
    getAllAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    deleteAchievementByCompanyUUID
};
