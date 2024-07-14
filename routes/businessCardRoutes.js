// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const uuid = require('uuid'); // Import uuid package
// const businessCardController = require('../controllers/businessCardController');

// // Create the uploads directory if it doesn't exist
// const uploadDirectory = 'public/uploads/BusinessCards';
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDirectory);
//     },
//     filename: function (req, file, cb) {
//         const extension = file.originalname.split('.').pop(); // Get the file extension
//         const uniqueFilename = `${uuid.v4()}.${extension}`; // Generate unique filename
//         cb(null, uniqueFilename);
//     }
// });

// // Multer upload configuration
// const upload = multer({ storage: storage });

// // Routes
// router.get('/', businessCardController.getAllBusinessCards);
// router.get('/:id', businessCardController.getBusinessCardById);
// router.post('/', businessCardController.createBusinessCard);
// router.put('/:id', businessCardController.updateBusinessCard);
// router.delete('/:id', businessCardController.deleteBusinessCard);
// router.post('/upload-front-image', upload.single('frontImage'), businessCardController.uploadFrontImage);
// router.post('/upload-back-image', upload.single('backImage'), businessCardController.uploadBackImage);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const businessCardController = require('../controllers/businessCardController');

// Middleware to authenticate user (assuming you have authentication middleware)
const authenticateUser = require('../middlewares/authenticateUser');

// Create the uploads directory if it doesn't exist
const uploadDirectory = path.join('public', 'uploads', 'BusinessCards');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const uniqueFilename = `${uuidv4()}${extension}`; // Generate unique filename
        cb(null, uniqueFilename);
    }
});

// Multer upload configuration
const upload = multer({ storage });

// Routes
router.get('/uploads/BusinessCards/:imageName', businessCardController.getBusinessCardImage);
router.get('/:companyUUID', authenticateUser, businessCardController.getAllBusinessCards);
router.get('/:id', authenticateUser, businessCardController.getBusinessCardById);
router.post('/', upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]), authenticateUser, businessCardController.createBusinessCard);
router.put('/:id', upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]), authenticateUser, businessCardController.updateBusinessCard);
router.delete('/:id', authenticateUser, businessCardController.deleteBusinessCard);
router.put('/change-status/:id', authenticateUser, businessCardController.changeStatus);

module.exports = router;
