// controllers/companyController.js

const companyModel = require('../models/companyModel');
const achievementModel = require('../models/achievementModel');
const businessCardModel = require('../models/businessCardModel');
const networkCategoryModel = require('../models/networkCategoryModel');
const contactModel = require('../models/contactModel');
const projectModel = require('../models/projectModel');
const servicesModel = require('../models/servicesModel');
const socialMediaAccountsModel = require('../models/socialMediaAccountsModel');
const db = require('../config/dbConfig'); // Import your database configuration
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyModel.getAllCompanies(req.body.userId);
        res.status(200).json(companies[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};

const getCompanyById = async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await companyModel.getCompanyById(companyId);
        if (company.length === 0) {
            res.status(404).json({ error: 'Company not found' });
        } else {
            res.status(200).json(company[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};


const createCompany = async (req, res) => {
    const companyData = req.body;
    try {
        await companyModel.createCompany(companyData);
        res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create company' });
    }
};

const updateCompany = async (req, res) => {
    const companyId = req.params.id;
    const companyData = req.body;
    try {
        // Check if a file is uploaded
        if (req.file) {
            // Generate a unique filename for the image
            const filename = uuidv4() + req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
            // Delete old image if it exists
            const company = await companyModel.getCompanyById(companyId);
            const oldImage = company[0].logo;
            if (oldImage) {
                fs.unlinkSync(`public/uploads/${oldImage}`);
            }
            // Move the uploaded file to the uploads directory with the unique filename
            fs.renameSync(req.file.path, `public/uploads/${filename}`);
            // Update company data with the new image filename
            companyData.logo = filename;
        }
        await companyModel.updateCompany(companyId, companyData);
        res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update company' });
    }
};

const deleteCompany = async (req, res) => {
    const companyUUID = req.params.uuid;
    try {
        // Delete company's image if it exists
        const company = await companyModel.getCompanyByUUID(companyUUID);
        const logo = company[0].logo;
        if (logo) {
            fs.unlinkSync(`public/uploads/${logo}`);
        }

        const businessCards = await businessCardModel.getAllBusinessCards(companyUUID);

        for (const card of businessCards) {
            if (card.FrontImageURL) {
                await businessCardModel.deleteImage(card.FrontImageURL);
            }
            if (card.BackImageURL) {
                await businessCardModel.deleteImage(card.BackImageURL);
            }
        }

        
        await businessCardModel.deleteBusinessCardByCompanyUUID(companyUUID);
        await achievementModel.deleteAchievementByCompanyUUID(companyUUID);
        await contactModel.deleteContactByUUID(companyUUID);
        await networkCategoryModel.deleteCategoryByCompanyUUID(companyUUID);
        await projectModel.deleteProjectByCompanyUUID(companyUUID);
        await servicesModel.deleteServiceByCompanyUUID(companyUUID);
        await socialMediaAccountsModel.deleteSocialMediaAccountByCompanyUUID(companyUUID);
        await companyModel.deleteCompany(companyUUID);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete company' });
    }
};

// Controller function to check if a company exists
const checkCompanyExists = async (req, res) => {
    try {
        // Get the company name from the request query parameters
        const { companyName } = req.query;
        
        // Query to check if a company with the provided name exists (case-insensitive)
        const query = `
            SELECT COUNT(*) AS count FROM company WHERE LOWER(companyName) = LOWER(?)
        `;
        
        // Execute the query
        const [result] = await db.query(query, [companyName.trim()]); // Trim whitespace and convert to lowercase
        
        // Check if a company with the provided name exists
        const exists = result[0].count > 0;
        
        // Send response indicating if the company exists
        res.json({ exists });
    } catch (error) {
        console.error('Error checking company existence:', error);
        res.status(500).json({ error: 'Failed to check company existence' });
    }
};

const checkCompanyExistsByUUID = async (req, res) => {
    try {
        // Get the UUID from the request query parameters
        const { uuid } = req.body;
        
        // Query to check if a company with the provided UUID exists
        const query = `
            SELECT COUNT(*) AS count FROM company WHERE uuid = ?
        `;
        
        // Execute the query
        const [result] = await db.query(query, [uuid]);
        
        // Check if a company with the provided UUID exists
        const exists = result[0].count > 0;
        
        // Send response indicating if the company exists
        res.json({ exists });
    } catch (error) {
        console.error('Error checking company existence:', error);
        res.status(500).json({ error: 'Failed to check company existence' });
    }
};

const getCompanyByUUID = async (req, res) => {
    try {
        // Get the UUID from the request query parameters
        const { uuid } = req.body;
        
        // Query to check if a company with the provided UUID exists
        const query = `
            SELECT * FROM company WHERE uuid = ?
        `;
        
        // Execute the query
        const [result] = await db.query(query, [uuid]);
        
        // Send response indicating if the company exists
        res.json([result][0]);
    } catch (error) {
        console.error('Error checking company existence:', error);
        res.status(500).json({ error: 'Failed to check company existence' });
    }
};

const getCompanyByName = async (req, res) => {
    try {
        // Get the CompanyName from the request query parameters
        const { companyname } = req.body; // Assuming companyname is in query parameters
        
        // Query to check if a company with the provided CompanyName exists
        const query = `
            SELECT * FROM company WHERE companyname LIKE ?
        `;
        
        // Execute the query
        const [result] = await db.query(query, [`%${companyname}%`]);
        
        // Send response indicating if the company exists
        res.json(result[0]);
    } catch (error) {
        console.error('Error checking company existence:', error);
        res.status(500).json({ error: 'Failed to check company existence' });
    }
};


// Function to handle file upload
const uploadCompanyLogo = async (req, res) => {
    const companyUUID = req.query.companyUUID; // Assuming you're sending the companyId along with the request
    // const filePath = req.file.path; // Path of the uploaded image
    const fileName = req.file.filename; // Name of the uploaded file
    try {
        // Check if the company exists
        const [existingCompany] = await companyModel.getCompanyByUUID(companyUUID);
        if (existingCompany.length === 0) {
            // Company not found
            return res.status(404).json({ error: 'Company not found' });
        }

        // Check if the company already has a logo
        if (existingCompany[0].LogoURL) {
            // Delete the old logo file
            fs.unlinkSync("public/uploads/"+existingCompany[0].LogoURL);
        }

        // Update the company with the new logo path
        await companyModel.updateCompanyLogo(companyUUID, fileName);
        
        const [updatedCompany] = await companyModel.getCompanyByUUID(companyUUID);
        
        // Respond with success message
        res.status(200).json({ message: 'Logo uploaded successfully', company: updatedCompany[0] });
    } catch (error) {
        console.error('Error uploading logo:', error);
        res.status(500).json({ error: 'Failed to upload logo' });
    }
};

const getCompanyLogo = (req, res) => {
    const LogoPath = req.params.logoPath;
    const imagePath = path.join(__dirname, '../public/uploads', LogoPath);

    // Send the image file
    res.sendFile(imagePath);
};

// Function to retrieve a company logo by UUID
const getCompanyLogoByUUID = async (req, res) => {
    const companyUUID = req.params.uuid;
    try {
        // Retrieve the company information by UUID
        const company = await companyModel.getCompanyByUUID(companyUUID);
        console.log(company);
        if (company.length === 0 || !company[0].logoUrl) {
            // If company or logo URL not found, return error
            return res.status(404).json({ error: 'Logo not found' });
        }
        // Construct the file path using the logo URL
        const imagePath = path.join(__dirname, '../public/uploads', company[0].logoUrl);
        // Send the logo image file
        // res.sendFile(imagePath);
        res.status(200).json({ message: 'get logo successfully', test: company });
    } catch (error) {
        // Handle errors
        console.error('Error retrieving logo:', error);
        res.status(500).json({ error: 'Failed to retrieve logo' });
    }
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    getCompanyByUUID,
    createCompany,
    updateCompany,
    deleteCompany,
    checkCompanyExists,
    checkCompanyExistsByUUID,
    uploadCompanyLogo, // Add the new function here
    getCompanyLogo,
    getCompanyLogoByUUID,
    getCompanyByName
};
