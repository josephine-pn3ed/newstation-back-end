require('dotenv').config();
const db = require('rethinkdbdash')

const {
    DB_NAME = "newstation_db",
    DB_HOST = "localhost",
    DB_PORT = "28015"
} = process.env;

module.exports = db({
    db: DB_NAME,
    host: DB_HOST,
    port: DB_PORT
})