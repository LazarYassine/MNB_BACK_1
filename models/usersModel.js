const db = require('../config/dbConfig');

// Function to get a user by its ID and for a specific company
const getUserById = async (userId) => {
    const sql = 'SELECT UserID, Username, Email FROM user WHERE UserID = ?';
    const [result] = await db.query(sql, [userId]);
    return result[0];
};

const getUserSubscriptionDetailsByUserId = async (userId) => {
    const sql = `
    SELECT 
        p.PlanName,
        f.FeatureName,
        pf.LimitValue,
        up.StartDate,
        up.EndDate
    FROM 
        UserPlans up
    JOIN 
        Plans p ON up.PlanID = p.PlanID
    JOIN 
        PlanFeatures pf ON p.PlanID = pf.PlanID
    JOIN 
        Features f ON pf.FeatureID = f.FeatureID
    WHERE 
        up.UserID = ?
        AND CURDATE() BETWEEN up.StartDate AND up.EndDate -- Only active subscriptions
    ORDER BY 
        up.EndDate DESC -- Order by end date in descending order;
`;;
    const [result] = await db.query(sql, [userId]);
    return result;
};

const updateUser = async (userData) => {
    const { userId, email, username, password, hashedPassword } = userData;
    const sql = `
        UPDATE user 
        SET Email = ?, Username = ?, PasswordHash = ?
        WHERE UserID = ?
    `;
    return db.query(sql, [email, username, hashedPassword, userId]);
};


module.exports = {
    getUserById,
    getUserSubscriptionDetailsByUserId,
    updateUser
};
