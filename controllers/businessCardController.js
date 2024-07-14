const businessCardModel = require('../models/businessCardModel');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');



const getBusinessCardImage = (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../public/uploads/BusinessCards', imageName);

    // Send the image file
    res.sendFile(imagePath);
};

const getAllBusinessCards = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    try {
        
        const businessCards = await businessCardModel.getAllBusinessCards(companyUUID);
        res.status(200).json(businessCards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch business cards' });
    }
};

const getBusinessCardById = async (req, res) => {
    const cardId = req.params.id;
    try {
        const businessCard = await businessCardModel.getBusinessCardById(cardId);
        if (!businessCard) {
            res.status(404).json({ error: 'Business card not found' });
        } else {
            res.status(200).json(businessCard);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch business card' });
    }
};

const createBusinessCard = async (req, res) => {
    const isActive = req.body.isActive;
    const companyUUID = req.body.companyUUID;
    const frontImageURL = req.files['frontImage'] ? req.files['frontImage'][0].filename : null;
    const backImageURL = req.files['backImage'] ? req.files['backImage'][0].filename : null;
    try {
        const newBusinessCard = await businessCardModel.createBusinessCard({
            companyUUID,
            frontImageURL,
            backImageURL,
            isActive
        });
        res.status(201).json({ message: 'Business card created successfully', businessCard: newBusinessCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create business card' });
    }
};


const updateBusinessCard = async (req, res) => {
    const cardId = req.params.id;
    const isActive = req.body.isActive;
    const companyUUID = req.body.companyUUID;

    let frontImageURL, backImageURL;

    if (req.files) {
        frontImageURL = req.files['frontImage'] ? req.files['frontImage'][0].filename : null;
        backImageURL = req.files['backImage'] ? req.files['backImage'][0].filename : null;
    }

    try {
        await businessCardModel.updateBusinessCard(cardId, {
            companyUUID,
            frontImageURL,
            backImageURL,
            isActive
        });
        res.status(200).json({ message: 'Business card updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update business card' });
    }
};


const deleteBusinessCard = async (req, res) => {
    const cardId = req.params.id;
    try {
        await businessCardModel.deleteBusinessCard(cardId);
        res.status(200).json({ message: 'Business card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete business card' });
    }
};

const changeStatus = async (req, res) => {
    const cardId = req.params.id;
    const isActive = req.body.isActive; 
    // Convert string to boolean
    try {
        await businessCardModel.changeStatus(cardId, isActive);
        res.status(200).json({ message: 'Business card status changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change business card status' });
    }
};

// Function to handle file upload for front image
const uploadFrontImage = async (req, res) => {
    try {
        const frontImageURL = req.file ? req.file.filename : null;
        res.status(200).json({ message: 'Front image uploaded successfully', frontImageURL });
    } catch (error) {
        console.error('Error uploading front image:', error);
        res.status(500).json({ error: 'Failed to upload front image' });
    }
};

// Function to handle file upload for back image
const uploadBackImage = async (req, res) => {
    try {
        const backImageURL = req.file ? req.file.filename : null;
        res.status(200).json({ message: 'Back image uploaded successfully', backImageURL });
    } catch (error) {
        console.error('Error uploading back image:', error);
        res.status(500).json({ error: 'Failed to upload back image' });
    }
};

module.exports = {
    getBusinessCardImage,
    getAllBusinessCards,
    getBusinessCardById,
    createBusinessCard,
    updateBusinessCard,
    deleteBusinessCard,
    uploadFrontImage,
    uploadBackImage,
    changeStatus
};
