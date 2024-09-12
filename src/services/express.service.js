const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('../routes/index.js')
const cors = require('cors')
const appConfigs = require('../configs/app.config')

// Set the allowed origin for CORS requests
let corsOptions = {
    origin: appConfigs.default.frontUrl
};

const app = express() // Create an Express application


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Enable CORS with the specified options
app.use(cors(corsOptions))

// Use the API router for routes starting with /api/v1
app.use('/api/v1',apiRouter);

// Starts the Express server and listens on the configured port
exports.start = () => {
    const port = appConfigs.default.port || 8000
    app.listen(port, (err) => {
        if(err){
            // Log an error message and exit the process if there's a problem starting the server
            console.log(`Erreur: ${err}`)
            process.exit(-1);
        }
        // Log a message indicating that the server is running
        console.log(`L'application est en marche sur le port ${port}`)
    })
}