const express = require('express');
const router = express.Router();
const gumroadController = require('../controllers/gumroadController');

// POST route to handle Gumroad Ping
router.post('/gumroad-ping', gumroadController.handlePing);

module.exports = router;
