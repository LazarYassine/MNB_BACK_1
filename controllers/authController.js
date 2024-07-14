const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

const loginUser1 = async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = `
            SELECT * FROM User WHERE Email = ?
        `;
        const [rows] = await db.execute(query, [email]);

        if (!rows || !rows.length) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userQuery = `
            SELECT * FROM User WHERE Email = ?
        `;
        const [rows] = await db.execute(userQuery, [email]);

        if (!rows || !rows.length) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const licenseQuery = `
            SELECT * FROM UserPlans
            JOIN Plans ON UserPlans.PlanID = Plans.PlanID
            WHERE UserID = ? AND CURDATE() BETWEEN StartDate AND EndDate
            ORDER BY EndDate DESC LIMIT 1
        `;
        const [licenseRows] = await db.execute(licenseQuery, [user.UserID]);

        let licenseInfo = null;
        if (licenseRows && licenseRows.length) {
            const license = licenseRows[0];
            licenseInfo = {
                type: license.PlanName,
                startDate: license.StartDate,
                endDate: license.EndDate
            };
        }

        const tokenPayload = {
            userId: user.UserID,
            username: user.Username,
            email: user.Email,
            license: licenseInfo,
            iofp: false
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '20h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};


const loginUserOnlyForPayment = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userQuery = `
            SELECT * FROM User WHERE Email = ?
        `;
        const [rows] = await db.execute(userQuery, [email]);

        if (!rows || !rows.length) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const licenseQuery = `
            SELECT * FROM UserPlans
            JOIN Plans ON UserPlans.PlanID = Plans.PlanID
            WHERE UserID = ? AND CURDATE() BETWEEN StartDate AND EndDate
            ORDER BY EndDate DESC LIMIT 1
        `;
        const [licenseRows] = await db.execute(licenseQuery, [user.UserID]);

        let licenseInfo = null;
        if (licenseRows && licenseRows.length) {
            const license = licenseRows[0];
            licenseInfo = {
                type: license.PlanName,
                startDate: license.StartDate,
                endDate: license.EndDate
            };
        }

        const tokenPayload = {
            userId: user.UserID,
            username: user.Username,
            email: user.Email,
            license: licenseInfo,
            iofp: true
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '20h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};


module.exports = {
    loginUser,
    loginUserOnlyForPayment
};
