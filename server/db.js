const { Client } = require('pg');
require('dotenv').config();

let client;

if (process.env.DATABASE_URL) {

    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {

    client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
    });
}

client
    .connect()
    .then(() => console.log('connected to db'))
    .catch((err) => console.error('connection error', err.stack));

module.exports = client;
