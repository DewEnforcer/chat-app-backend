module.exports = function (port, callback) {
    const io = require("socket.io")(port);

    io.on("connection", callback);
}