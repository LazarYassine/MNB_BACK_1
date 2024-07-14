// // server.js

// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const PORT = process.env.PORT || 3000;
// const companyRoutes = require('./routes/companyRoutes');
// const servicesRoutes = require('./routes/servicesRoutes');
// const projectsRoutes = require('./routes/projectRoutes');
// const achievementsRoutes = require('./routes/achievementRoutes');
// const networkCategoryRoutes = require('./routes/networkCategoryRoutes');
// const contactsRoutes = require('./routes/contactRoutes');
// const businessCardsRoutes = require('./routes/businessCardRoutes');
// const socialMediaAccountsRoutes = require('./routes/socialMediaAccountsRoutes');
// const emailCategoryRoutes = require('./routes/emailCategoryRoutes'); 
// const emailsListRoutes = require('./routes/emailsListRoutes');

// // Middleware
// app.use(express.json());

// // Allow CORS for specific origins
// const corsOptions = {
//     origin: ['http://localhost:4200', 'http://example2.com', '*'], // Add your allowed origins here
//     methods: ['GET', 'POST', "PUT" ,"DELETE"], // Specify allowed HTTP methods
//   };
  
//   app.use(cors(corsOptions));


// // Routes
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/subscription', subscriptionRoutes);
// app.use('/api/companies', companyRoutes);
// app.use('/api/services', servicesRoutes);
// app.use('/api/projects', projectsRoutes);
// app.use('/api/achievements', achievementsRoutes);
// app.use('/api/networkcategories', networkCategoryRoutes);
// app.use('/api/contacts', contactsRoutes)
// app.use('/api/business-cards', businessCardsRoutes);
// app.use('/api/social-media-accounts', socialMediaAccountsRoutes);
// app.use('/api/email-categories', emailCategoryRoutes);
// app.use('/api/emails-list', emailsListRoutes);


// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const companyRoutes = require('./routes/companyRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const projectsRoutes = require('./routes/projectRoutes');
const achievementsRoutes = require('./routes/achievementRoutes');
const networkCategoryRoutes = require('./routes/networkCategoryRoutes');
const contactsRoutes = require('./routes/contactRoutes');
const businessCardsRoutes = require('./routes/businessCardRoutes');
const socialMediaAccountsRoutes = require('./routes/socialMediaAccountsRoutes');
const emailCategoryRoutes = require('./routes/emailCategoryRoutes'); 
const emailsListRoutes = require('./routes/emailsListRoutes');

// Middleware
app.use(express.json());

// Allow CORS for specific origins
const corsOptions = {
    origin: ['http://localhost:4200', 'https://mnbconnect.netlify.app', 'https://mnbconnect.fr.to', 'http://mnbconnect.fr.to', '*'], // Add your allowed origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
};
app.use(cors(corsOptions));

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/networkcategories', networkCategoryRoutes);
app.use('/api/contacts', contactsRoutes)
app.use('/api/business-cards', businessCardsRoutes);
app.use('/api/social-media-accounts', socialMediaAccountsRoutes);
app.use('/api/email-categories', emailCategoryRoutes);
app.use('/api/emails-list', emailsListRoutes);

// Start server
// const httpServer = http.createServer(app);
// httpServer.listen(PORT, '0.0.0.0', () => {
//     console.log(`HTTP Server running on port ${PORT}`);
// });



// HTTPS Options
// const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/mnbconnect.fr.to/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/mnbconnect.fr.to/fullchain.pem')
// };

// Create HTTPS server
// const server = https.createServer(httpsOptions, app)
// Définir une route simple
app.get('/', (req, res) => {
    res.send('Hello, HTTP!');
});
const server = http.createServer(app);

// Start server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// const httpsServer = https.createServer(httpsOptions, app);
// httpsServer.listen(8443, '0.0.0.0', () => {
//     console.log('HTTPS Server running on port 8443');
// });
