require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
});
  
server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});