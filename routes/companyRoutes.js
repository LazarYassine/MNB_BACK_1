const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const uuid = require('uuid'); // Import uuid package
const companyController = require('../controllers/companyController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Create the uploads directory if it doesn't exist
const uploadDirectory = 'public/uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop(); // Get the file extension
        const uniqueFilename = `${uuid.v4()}.${extension}`; // Generate unique filename
        cb(null, uniqueFilename);
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Routes
router.get('/uploads/company/:logoPath', companyController.getCompanyLogo);
router.post('/', authenticateUser, companyController.getAllCompanies);
router.get('/:id', authenticateUser, companyController.getCompanyById);
router.post('/add-company', authenticateUser, companyController.createCompany);
router.put('/:id', authenticateUser, companyController.updateCompany);
router.delete('/delete/:uuid', authenticateUser, companyController.deleteCompany);
router.post('/upload-image', upload.single('logo'), authenticateUser, companyController.uploadCompanyLogo);

// Endpoint to check if a company exists
router.get('/check', companyController.checkCompanyExists);
router.get('/check-by-uuid', companyController.checkCompanyExistsByUUID);

router.post('/verify-by-uuid', authenticateUser, companyController.checkCompanyExistsByUUID);
router.post('/get-by-uuid', authenticateUser, companyController.getCompanyByUUID);
router.post('/get-by-name', authenticateUser, companyController.getCompanyByName);


module.exports = router;
