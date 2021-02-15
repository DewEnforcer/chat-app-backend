class ChatRoom {
    constructor(id, name) {
        this.name = name;
        this.id = id;
        this.users = []; //array of sockets

        this.messages = [];
    }

    getChatId = () => this.id;

    getUsersCount = () => this.users.length;

    addUser(user) {
        this.users.push(user);
        user.emit("chatData", {msgs: this.messages, chatName: this.name});

        const discMsg = this.createSystemMessage(1, user.user.username);
        this.users.forEach(u => u.emit("msg", discMsg));

        this.sendUsersPresent(); //terrible for optimalization, must be reworked if used publicly
    }
    sendUsersPresent() {
        const data = [];
        this.users.map(u => data.push(u.user));

        this.users.map(u => u.emit("chatUsers", data));
    }
    disconnectUser(user) {
        this.users = this.users.filter(u => u.user.id !== user.id);


        const discMsg = this.createSystemMessage(2, user.username);
        this.users.forEach(u => u.emit("msg", discMsg));

        this.sendUsersPresent(); //terrible for optimalization, must be reworked if used publicly
    }

    createMessage(text, author) {
        if (!text || !author) return null;
        return {
            id: this.messages.length,
            author,
            text
        }
    }
    createSystemMessage(statusId, text) {
        return {
            statusId,
            author: "system",
            text
        }
    }
    sendMessage(text, author) {
        const msg = this.createMessage(text, author);
        if (!msg) return;

        this.messages.push(msg);

        this.users.forEach(u => u.emit("msg", msg));
    }
}

module.exports = ChatRoom;