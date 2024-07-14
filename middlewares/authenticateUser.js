// // middleware/authenticateUser.js

// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//     try {
//         // Get the token from the request headers
//         const authHeader = req.headers.authorization;

//         // Check if authorization header exists
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Access denied. No token provided.' });
//         }

//         // Extract the token (remove 'Bearer ' prefix)
//         const token = authHeader.split(' ')[1];

//         // Verify the token
//         jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(401).json({ error: 'Invalid token.' });
//             } else {
//                 // Set the decoded user information in the request object
//                 req.user = decoded;
//                 next(); // Proceed to the next middleware
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal server error.' });
//     }
// };

// module.exports = authenticateUser;

// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//     try {
//         // Get the token from the request headers
//         const authHeader = req.headers.authorization;
//         const internalToken = req.headers['x-internal-token']; // Get the internal token from headers

//         // Check if authorization header exists
//         if (!authHeader || (!authHeader.startsWith('Bearer ') && !internalToken)) {
//             return res.status(401).json({ error: 'Access denied. No token provided.' });
//         }

//         // Extract the user token (remove 'Bearer ' prefix)
//         const userToken = authHeader.split(' ')[1];

//         if (internalToken) {
//             // Verify the internal token
//             jwt.verify(internalToken, process.env.JWT_SECRET, (error, decoded) => {
//                 if (error) {
//                     console.error(error);
//                     return res.status(401).json({ error: 'Invalid internal token.' });
//                 } else {
//                     // Check if the token is intended for shared-profile purpose
//                     if (decoded.purpose === 'shared-profile') {
//                         next(); // Proceed to the next middleware
//                     } else {
//                         return res.status(403).json({ error: 'Unauthorized access.' });
//                     }
//                 }
//             });
//         } else {
//             // Verify the user token
//             jwt.verify(userToken, process.env.JWT_SECRET, (error, decoded) => {
//                 if (error) {
//                     console.error(error);
//                     return res.status(401).json({ error: 'Invalid user token.' });
//                 } else {
//                     // Set the decoded user information in the request object
//                     req.user = decoded;
//                     next(); // Proceed to the next middleware
//                 }
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal server error.' });
//     }
// };

// module.exports = authenticateUser;


const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        // Check if the request includes the special header for shared profile
        const sharedProfileHeader = req.headers['x-shared-profile'];

        // If it's a shared profile request, allow access without token verification
        if (sharedProfileHeader === 'true') {
            return next();
        }

        // Get the token from the request headers
        const authHeader = req.headers.authorization;

        // Check if authorization header exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Extract the token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error(error);
                return res.status(401).json({ error: 'Invalid token.' });
            } else {
                // Set the decoded user information in the request object
                req.user = decoded;
                next(); // Proceed to the next middleware
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = authenticateUser;
