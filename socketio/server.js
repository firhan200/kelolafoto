require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const host_origin_url = process.env.NODE_ENV === 'production' ? process.env.HOST_ORIGIN_PRODUCTION : process.env.HOST_ORIGIN_DEV
const io = new Server({
    cors: {
      origin: host_origin_url
    }
});

console.log("host: "+ host_origin_url)
  
io.listen(3004);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('posts', (msg) => {
        console.log("receive posts emit")
        io.emit('posts', msg);
    });
});

server.listen(3003, () => {
  console.log('listening on *:3003');
});