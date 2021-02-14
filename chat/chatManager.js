const ChatRoom = require("./ChatRoom");

let chats = [];
let chatId = 0;

const createChatUser = (username) => {
    return {
        username,
        id: Date.now()
    }
}

const createChatRoom = data => {
    const newChatRoom = new ChatRoom(++chatId, data.chatName);
    const user = createChatUser(data.username);

    chats.push(newChatRoom);

    return {
        chatId: newChatRoom.getChatId(),
        user: user
    }
}

const terminateChatRoom = id => {
    chats = chats.filter(ch => ch.getChatId() !== id);
}

const joinChatRoom = data => {
    if (!getChatRoom(Number(data.chatId))) return null;

    return {
        chatId: data.chatId,
        user: createChatUser(data.username)
    }
}

const getChatRoom = chatId => chats.find(ch => ch.getChatId() === chatId)

const chatSocketHandler = socket => {
    let chatRoom = null;
    socket.on("connectRequest", ({chatId, user}) => {
        chatRoom = getChatRoom(Number(chatId));
        if (!chatRoom) return socket.disconnect();
        
        socket.user = user;
        
        chatRoom.addUser(socket);
    })

    socket.on("msgRequest", ({text}) => {
        chatRoom.sendMessage(text, socket.user);
    })

    socket.on("disconnect", () => {
        if (!chatRoom) return;

        chatRoom.disconnectUser(socket.user);
        console.log("User disconnected: ", socket.user);

        if (chatRoom.getUsersCount() === 0) terminateChatRoom();
    })
}

module.exports = {
    createChatRoom,
    joinChatRoom,
    chatSocketHandler
}