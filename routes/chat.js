const router = require("express").Router();
const chatManager = require("../chat/chatManager");

router.post("/join", (req, res) => {
    const data = req.body;
    if (!data.chatId || !data.username) return res.status(400).send("Missing required params");

    const chatData = chatManager.joinChatRoom(data);
    if (!chatData) return res.status(404).send("No chat room with given ID has been found!");

    res.send(chatData);
})

router.post("/", (req, res) => {
    const data = req.body;
    if (!data.username || !data.chatName) return res.status(400).send("Missing required params");

    const {chatId, user} = chatManager.createChatRoom(data);

    res.send({
        chatId,
        user
    })
});

module.exports = router;