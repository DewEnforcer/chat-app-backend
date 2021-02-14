const express = require("express");
const cors = require("cors");
const chatManager = require("./chat/chatManager");

const chat = require("./routes/chat");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chat);

app.listen(4000, () => {
    console.log("Listening on port 4000!");
})


require("./socket/socket")(5000, chatManager.chatSocketHandler);