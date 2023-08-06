const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST"],
    },
});

io.on('connection', socket => { 
    // Events
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({ sender, selectedContactId, messageData }) => {
        socket.to(selectedContactId).emit('receive-message', {
            sender,
            selectedContactId,
            messageData
        });
    });

    socket.on('disconnect', () => {
        // No need to log disconnections
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
