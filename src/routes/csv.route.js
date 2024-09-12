const express = require('express');
const router = express.Router(); 
const csvController = require('../controllers/csv.controller') 
const multer = require('multer')

// Configure multer for file uploads, storing files in the 'uploads/' directory
const upload = multer({dest: 'src/uploads/'})

// Define a route for POST requests to /csv/compress
// This route handles file uploads and compresses the CSV file using the csvController
router.post('/csv/compress', upload.single('file'), csvController.compress)

module.exports = router;