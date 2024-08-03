const express = require('express');
const path = require('path');
const router = express.Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

router.get('/', (req, res) => {
    res.render('index', { messages: messages });
});

router.get("/new", (req, res) => {
    res.render("form", { title: "New Message" });
})

router.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
})

router.get("/message/:index", (req, res) => {
    const message = messages[req.params.index];
    res.render("message", {title: "Message", message: message});
})



module.exports = router;

  