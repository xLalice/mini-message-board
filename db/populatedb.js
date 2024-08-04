const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const SQL = `
    DROP TABLE IF EXISTS messages;

    CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (author, content)
    VALUES 
        ('Jane Austen', 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.'),
        ('Jane Austen', 'A lady’s imagination is very rapid; it jumps from admiration to love, from love to matrimony, in a moment.'),
        ('Jane Austen', 'There is nothing like staying at home for real comfort.'),
        ('Jane Austen', 'To Mrs. Bennet, her mind was less a trap for words than for sentiments.'),
        ('Jane Austen', 'I could not have parted with you, my dear, for any consideration.'),
        ('Mark Twain', 'The secret of getting ahead is getting started.'),
        ('Albert Einstein', 'Two things are infinite: the universe and human stupidity; and I’m not sure about the universe.'),
        ('Oscar Wilde', 'Be yourself; everyone else is already taken.'),
        ('Ernest Hemingway', 'The best way to find out if you can trust somebody is to trust them.'),
        ('George Orwell', 'In a time of deceit telling the truth is a revolutionary act.')
`;

async function main() {
    console.log("Seeding...");
    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync(path.join(__dirname, "ca-certificate.crt")).toString()
        }
    });
    
    try {
        await client.connect();
        await client.query(SQL);
        console.log("Seeding Complete");
    } catch (error) {
        console.error("Error setting up database: ", error);
    } finally {
        await client.end();
    }
}

main();
