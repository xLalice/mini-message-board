const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // This line ensures SSL is used, and turns off strict SSL verification.
});

module.exports = pool;
