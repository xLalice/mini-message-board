const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

// Route to get all messages
router.get("/", indexController.getAllMessages);

// Route to get the form to post a new message
router.get("/new", indexController.getMessageForm);

// Route to handle form submission
router.post("/new", indexController.postMessageForm);

module.exports = router;
