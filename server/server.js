
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.on('Hello', () => {
    console.log('hello');
    socket.emit('Bye');
  })
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
