import { DataSource } from "typeorm"

const config = require('./util/config.js');

const AppDataSource = new DataSource({
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

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })