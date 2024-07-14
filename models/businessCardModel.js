const db = require('../config/dbConfig');
const path = require('path');
const fs = require('fs');

// Function to get all business cards
const getAllBusinessCards = async (companyUUID) => {
    try {
        const [rows] = await db.query('SELECT * FROM businesscard WHERE company_uuid = ?', [companyUUID]);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to get a business card by ID
const getBusinessCardById = async (cardId) => {
    try {
        const [rows] = await db.query('SELECT * FROM businesscard WHERE CardID = ?', [cardId]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Function to create a new business card
const createBusinessCard = async ({ companyUUID, frontImageURL, backImageURL, isActive }) => {
    try {
        const [result] = await db.query('INSERT INTO businesscard (company_uuid, FrontImageURL, BackImageURL, IsActive) VALUES (?, ?, ?, ?)', [companyUUID, frontImageURL, backImageURL, isActive]);
        return { cardId: result.insertId, companyUUID, frontImageURL, backImageURL, isActive };
    } catch (error) {
        throw error;
    }
};

// Function to update a business card
const updateBusinessCard = async (cardId, { companyUUID, frontImageURL, backImageURL, isActive }) => {
    try {
        // Fetch the existing business card data
        const existingCard = await getBusinessCardById(cardId);

        // If frontImageURL is being updated and there's an existing front image, delete it
        if (frontImageURL !== undefined && existingCard.FrontImageURL) {
            deleteImage(existingCard.FrontImageURL);
        }

        // If backImageURL is being updated and there's an existing back image, delete it
        if (backImageURL !== undefined && existingCard.BackImageURL) {
            deleteImage(existingCard.BackImageURL);
        }

        // Update the business card in the database
        let query = 'UPDATE businesscard SET ';
        let params = [];
        let updates = [];

        if (companyUUID !== undefined) {
            updates.push('company_uuid = ?');
            params.push(companyUUID);
        }

        if (frontImageURL !== undefined) {
            updates.push('FrontImageURL = ?');
            params.push(frontImageURL);
        }

        if (backImageURL !== undefined) {
            updates.push('BackImageURL = ?');
            params.push(backImageURL);
        }

        if (isActive !== undefined) {
            updates.push('IsActive = ?');
            params.push(isActive);
        }

        query += updates.join(', ') + ' WHERE CardID = ?';
        params.push(cardId);

        await db.query(query, params);

        return { cardId, companyUUID, frontImageURL, backImageURL, isActive };
    } catch (error) {
        throw error;
    }
};

// Function to delete an image file

const deleteImage = (imageUrl) => {
    const imagePath = path.join('public', 'uploads', 'BusinessCards', imageUrl);
    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted old image: ${imageUrl}`);
        } else {
            console.log(`Image does not exist: ${imageUrl}`);
        }
    } catch (error) {
        console.error(`Error deleting image: ${error}`);
    }
};


// Function to delete a business card
const deleteBusinessCard = async (cardId) => {
    try {
        await db.query('DELETE FROM businesscard WHERE CardID = ?', [cardId]);
        return { message: 'Business card deleted successfully' };
    } catch (error) {
        throw error;
    }
};

const deleteBusinessCardByCompanyUUID = async (uuid) => {
    try {
        await db.query('DELETE FROM businesscard WHERE company_uuid = ?', [uuid]);
        return { message: 'Business card deleted successfully' };
    } catch (error) {
        throw error;
    }
}

const changeStatus = async (cardId, isActive) => {
    try {
        // Execute a SQL query to update the status
        await db.query('UPDATE businesscard SET IsActive = ? WHERE CardID = ?', [isActive === 'true' ? 1:0, cardId]);
    } catch (error) {
        throw error;
    }
};

module.exports = { changeStatus };


module.exports = {
    getAllBusinessCards,
    getBusinessCardById,
    createBusinessCard,
    updateBusinessCard,
    deleteBusinessCard,
    deleteBusinessCardByCompanyUUID,
    changeStatus,
    deleteImage
};
