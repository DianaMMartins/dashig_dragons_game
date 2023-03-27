// const monk = require("monk");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const db = require("monk")(
  "mongodb+srv://pindernc:Xa7nqPHPaMKEEZDz@pinder.skvgszw.mongodb.net/?retryWrites=true&w=majority"
//   'mongodb://pindernc:Xa7nqPHPaMKEEZDz@localhost:4000/sample_mflix?authSource=admin'
);
const collectionComments = db.get("comments");

io.on("connection", (socket) => {
    // const { collections } = collectionComments;
    // console.log(collections);
  console.log(socket.id, "connected");
  socket.on('Hello', () => {
    collectionComments.find({}).then(docs => {
        console.log(docs);
        console.log('i\'m in find one');
    })
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
