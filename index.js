require('dotenv').config(); // Load environment variables from a .env file into process.env
const express = require('./src/services/express.service')

express.start() // Start the Express server