const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
const userModel = require('../models/usersModel');


const registerUser1 = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        // First, insert the user
        const userQuery = `
            INSERT INTO User (Username, Email, PasswordHash)
            VALUES (?, ?, ?)
        `;
        const userResult = await db.query(userQuery, [username, email, hashedPassword]);
        // Get the ID of the newly inserted user
        const userId = userResult[0].insertId;
        // Insert a free trial license for the user
        const licenseQuery = `
            INSERT INTO License (UserID, Type, Status)
            VALUES (?, 'FREE_TRIAL', 'Active')
        `;
        await db.query(licenseQuery, [userId]);

        // Retrieve the user's general information
        const userInfoQuery = `
            SELECT UserID, Username, Email
            FROM User
            WHERE UserID = ?
        `;
        const userInfoResult = await db.query(userInfoQuery, [userId]);
        const userInfo = userInfoResult[0];

        // Combine user info into the response
        const response = {
            user: userInfo,
            message: 'User registered successfully'
        };

        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        // First, insert the user
        const userQuery = `
            INSERT INTO User (Username, Email, PasswordHash)
            VALUES (?, ?, ?)
        `;
        const userResult = await db.query(userQuery, [username, email, hashedPassword]);
        
        // Get the ID of the newly inserted user
        console.log("userResult ==> ", userResult[0].insertId);
        const userId = userResult[0].insertId;

        // Calculate the start and end dates for the free trial
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7); // Free trial lasts for 7 days

        // Insert a free trial plan for the user
        const planIdQuery = `SELECT PlanID FROM Plans WHERE PlanName = 'FREE TRIAL'`;
        const planResult = await db.query(planIdQuery);
        console.log("planResult ==> ", planResult[0][0].PlanID);
        const planId = planResult[0][0].PlanID;

        const userPlanQuery = `
            INSERT INTO UserPlans (UserID, PlanID, StartDate, EndDate)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(userPlanQuery, [userId, planId, startDate, endDate]);

        // Retrieve the user's general information
        const userInfoQuery = `
            SELECT UserID, Username, Email
            FROM User
            WHERE UserID = ?
        `;
        const userInfoResult = await db.query(userInfoQuery, [userId]);
        const userInfo = userInfoResult[0];

        // Combine user info into the response
        const response = {
            user: userInfo,
            message: 'User registered successfully'
        };

        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const service = await userModel.getUserById(userId);
        if (!service) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Failed to fetch user by ID' });
    }
};

const getUserSubscriptionDetailsById = async (req, res) => {
    const userId = req.params.id;
    try {
        const service = await userModel.getUserSubscriptionDetailsByUserId(userId);
        if (!service) {
            return res.status(404).json({ error: 'Subcreption or user not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Failed to fetch user by ID' });
    }
};

const updateUser = async (req, res) => {
    const { userId, email, username, password, } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        await userModel.updateUser({ userId, email, username, password, hashedPassword });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const checkUserEmailExistence = async (req, res) => {
    try {
        const { email } = req.body;

        const userQuery = `
            SELECT * FROM User WHERE Email = ?
        `;
        const [rows] = await db.execute(userQuery, [email]);

        if (rows && rows.length > 0) {
            return res.status(200).json({isEmailUnique: false});
        }else {
            return res.status(200).json({isEmailUnique: true});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check email uniquness' });
    }
};

const updateUserPlan = async (req, res) => {
    try {
        const { userId, plan, numberOfMonths } = req.body;

        // Get the plan ID based on the plan name from the request body
        const planIdQuery = `SELECT PlanID FROM Plans WHERE PlanName = ?`;
        const planResult = await db.query(planIdQuery, [plan]);

        if (planResult[0].length === 0) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        const planId = planResult[0][0].PlanID;

        // Get the current date for StartDate
        const startDate = new Date();

        // Calculate EndDate based on the number of months and add 2 extra days
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + numberOfMonths);
        endDate.setDate(endDate.getDate() + 2);

        // Update the plan for the user
        const userPlanQuery = `
            INSERT INTO UserPlans (UserID, PlanID, StartDate, EndDate)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE PlanID = VALUES(PlanID), StartDate = VALUES(StartDate), EndDate = VALUES(EndDate)
        `;
        await db.query(userPlanQuery, [userId, planId, startDate, endDate]);

        return res.status(200).json({ message: 'User plan updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update user plan' });
    }
};


module.exports = {
    registerUser,
    getUserById,
    getUserSubscriptionDetailsById,
    updateUser,
    checkUserEmailExistence,
    updateUserPlan
};
