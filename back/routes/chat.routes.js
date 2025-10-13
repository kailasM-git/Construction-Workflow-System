const express = require("express");
const router = express.Router();

const chatController = require("../controller/chat.controller");

// Route to send a message
router.get("/fetchUsers", chatController.FetchUsers);
router.post("/send", chatController.sendMessage);
router.post("/fetchMessage", chatController.fetchMessage);

module.exports = router;
