const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function postNewMessage(author, content) {
    await pool.query("INSERT INTO messages (author, content) VALUES ($1, $2)", [author, content]);
}

module.exports = {
    getAllMessages,
    postNewMessage
};
