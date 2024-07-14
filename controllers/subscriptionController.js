// controllers/subscriptionController.js

const db = require('../config/dbConfig');

const subscribeUser = (req, res) => {
    const { userId, subscriptionType } = req.body;

    const query = `
        UPDATE User SET SubscriptionType = ? WHERE UserID = ?
    `;
    db.query(query, [subscriptionType, userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to subscribe user' });
        } else {
            res.status(200).json({ message: 'User subscribed successfully' });
        }
    });
};

module.exports = {
    subscribeUser,
};
