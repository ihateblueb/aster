
const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;



const Sequelize = require('sequelize');

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
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
