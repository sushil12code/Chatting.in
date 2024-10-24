// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Broadcast message to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
