const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const server = http.createServer(app);

//middleware
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST"],
    },
})
io.on('connection', socket => {

    //events
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ sender, selectedContactId, messageData }) => {

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

app.get("/", (req, res) => {
    res.send({ response: "Socket Server is up and running." }).status(200);
  });

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server start listening`);
});




