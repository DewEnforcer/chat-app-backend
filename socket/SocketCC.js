class Socket {
    constructor(port, callback) {
        this.socket = require("socket.io")(port);

        this.socket.on("connection", callback);
    }
}

module.exports = Socket;