const yaml = require('js-yaml');
const fs = require('fs');

try {
    var config = yaml.load(fs.readFileSync('../../.config/production.yml', 'utf8'));
    console.log("[config] configuration loaded successfully!");
} catch (e) {
    console.error("[config] "+e);
    console.error("[config] fatal. now aborting.");
    process.exit(1);
}

var dbhost = config.dbname;
var dbname = config.dbname;
var dbuser = config.dbuser;
var dbpass = config.dbpass;

const Sequelize = require('sequelize');

const db = new Sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialect: postgres,
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    },
    define: {
        timestamps: false
    }
});

module.exports = db;
