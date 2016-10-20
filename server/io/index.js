'use strict';
const socketio = require('socket.io');
var io = null;

module.exports = server => {

    if (io) return io;

    io = socketio(server);

    io.on('connection', () => {
        // Now have access to socket, wowzers!
    });

    return io;

};
