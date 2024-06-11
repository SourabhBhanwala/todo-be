const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const swaggerUIPath= require("swagger-ui-express");
const swaggerjsonFilePath = require("./docs/swagger.json");
const cors = require('cors');

// create express app
const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {   
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to ToDo application."});
});
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));
require('./app/routes/routes.js')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});