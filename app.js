const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./middlewares/logger');
const paypal = require('paypal-rest-sdk');

// Load Env Variables
dotenv.config({ path: './config/config.env' });

// Load & Connect Database Files
const Database = require('./config/db');
Database();

// App Initialization
const app = express();

// Enable cors
app.use(cors());
// Body Parser
app.use(express.json());
// Logger
app.use(logger);
// Load Static Files
app.use(express.static(path.join(__dirname, './public')));

//Backend Routes
app.use('/book', require('./route/routes').backend_router);
app.use('/pay', require('./route/routes').backend_router);
app.use('/auth', require('./route/routes').backend_router);

//Frontend Routes
app.use('/', require('./route/routes').frontend_router);
// app.use('/addbook', require('./controller/book.js').addBook);


const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log("Server running in " + process.env.NODE_ENV + " mode on port " + PORT);
});