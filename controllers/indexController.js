const db = require("../db/queries");

async function getAllMessages(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render("index", { title: "Messages", messages: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getMessageForm(req, res) {
    res.render("form", {});
}

async function postMessageForm(req, res) {
    const { author, content } = req.body;
    try {
        await db.postNewMessage(author, content);
        res.redirect("/");
    } catch (error) {
        console.error("Error posting message:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllMessages,
    getMessageForm,
    postMessageForm
};
