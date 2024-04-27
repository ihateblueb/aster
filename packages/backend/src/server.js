//
// Aster
//

process.title = "Aster"

console.log("            _____ _______ ______ _____  ");
console.log("     /\\    / ____|__   __|  ____|  __ \\ ");
console.log("    /  \\  | (___    | |  | |__  | |__) |");
console.log("   / /\\ \\  \\___ \\   | |  |  __| |  _  / ");
console.log("  / ____ \\ ____) |  | |  | |____| | \\ \\ ");
console.log(" /_/    \\_\\_____/   |_|  |______|_|  \\_\\");
console.log("                                        ");

const pkg = require('../../../package.json');

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(" ");

const {inject, errorHandler} = require('express-custom-error');
inject();

const express = require('express');
const cors = require('cors');
const logger = require('./util/logger.js');

const typeorm = require("typeorm");

const config = require('./util/config.js');

const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: config.dbhost,
    port: config.dbport,
    username: config.dbuser,
    password: config.dbpass,
    database: config.dbname,
    entities: ["./entities/"],
    migrations: ["./migrations/"],
    logging: true,
})

dataSource.initialize()
    .then(() => {
        console.log("[database] database connected successfully!");
    })
    .catch((e) => {
        console.error("[database] "+e);
        console.error("[database] fatal. now aborting.");
        process.exit(1);
    })

const app = express();

app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(logger.dev, logger.combined);
app.use(cors());

app.use('/', require('./routes/router.js'));

app.use(errorHandler());

app.use('*', (req, res) => {
    res.setHeader('Content-Type', 'application/activity+json');
})

app.use('*', (req, res) => {
    res
    .status(404)
    .json( {message: 'Not found.'} );
})

app.listen(
    config.port,
    () => console.info(`[backend] started instance as ${config.url} (port ${config.port})`)
);