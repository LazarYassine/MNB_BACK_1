const gumroadModel = require('../models/gumroadModel');

// Controller function to handle Gumroad Ping
async function handlePing(req, res) {
    try {
        // Extract relevant data from the request body
        const { sale_id, email, price, card } = req.body;

        // Send the Gumroad Ping data to the model for further processing
        const result = await gumroadModel.processPing(sale_id, email, price, card);

        // Return the result
        res.json(result);
    } catch (error) {
        console.error('Error handling Gumroad Ping:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handlePing
};
