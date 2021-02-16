const express = require("express");
const cors = require("cors");
const chatManager = require("./chat/chatManager");

const chat = require("./routes/chat");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chat);

const apiPort = process.env.PORT || 4000;

app.listen(apiPort, () => {
    console.log("Listening on port", apiPort);
})


require("./socket/socket")(5000, chatManager.chatSocketHandler);