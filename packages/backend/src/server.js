const {inject, errorHandler} = require('express-custom-error');
inject();

const yaml = require('js-yaml');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const logger = require('./util/logger.js');

console.log("[config] loading configuration...");

try {
    var config = yaml.load(fs.readFileSync('../../.config/production.yml', 'utf8'));
    console.log("[config] configuration loaded successfully!");
} catch (e) {
    console.error("[config] "+e);
    console.error("[config] fatal. now aborting.");
    process.exit(1);
}

const port = config.port;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cors());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/activity+json');
    next();
})

app.use('/', require('./routes/router.js'));

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {message: 'Not found.'} );
})

app.listen(
    port,
    () => console.info(`[backend] listening on port ${port}`)
);