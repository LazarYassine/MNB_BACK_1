// achievementController.js

const achievementModel = require('../models/achievementModel');

// Get all achievements for a company
const getAllAchievements = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    try {
        const achievements = await achievementModel.getAllAchievements(companyUUID);
        res.status(200).json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
};

// Create a new achievement
const createAchievement = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const achievementData = req.body;
    try {
        await achievementModel.createAchievement(companyUUID, achievementData);
        res.status(201).json({ message: 'Achievement created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create achievement' });
    }
};

// Update an achievement
const updateAchievement = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const achievementId = req.params.achievementId;
    const achievementData = req.body;
    try {
        await achievementModel.updateAchievement(companyUUID, achievementId, achievementData);
        res.status(200).json({ message: 'Achievement updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update achievement' });
    }
};

// Delete an achievement
const deleteAchievement = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const achievementId = req.params.achievementId;
    try {
        await achievementModel.deleteAchievement(companyUUID, achievementId);
        res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete achievement' });
    }
};

module.exports = {
    getAllAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
};
