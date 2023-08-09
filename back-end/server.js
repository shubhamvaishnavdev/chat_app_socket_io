const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();


//middleware
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST"],
    },
})
io.on('connection', socket => {
    // console.log("USER CONNECTED");

    //events
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ sender, selectedContactId, messageData }) => {
        // console.log("sender: " + sender + "  selected id: " + selectedContactId + "message data: " + messageData);

        socket.to(selectedContactId).emit('receive-message', {
            sender,
            selectedContactId,
            messageData
        })
    })

    socket.on('disconnect', () => {
        console.log("USER DISCONNECTED");
    })
})

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server start listening`);
});




