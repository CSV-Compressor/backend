const express = require('express')
const router = express.Router()
const csvRouter = require('./csv.route')

// Use the CSV router for handling routes under this router
router.use(csvRouter);

module.exports = router;// Export the configured router