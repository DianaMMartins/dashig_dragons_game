const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
app.use(cors({ origin: "*" }));
app.use(express.json());

//define schema --> create model, (collectionName, Schema) --> use model to make queries, e.g find, save, etc.

//Schemas
const schemaForAll = new Schema({});

//Models

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.emit("Hello", "world");
  // socket.on("Hello", () => {
  //   console.log("hello");
  //   socket.emit("Bye");
  // });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

const db = mongoose
  .connect(
    "mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/sample_mflix"
  )
  .then(() => {
    // console.log("listening 4040");
    server.listen(4040);
  });

// ?retryWrites=true&w=majority

module.exports = { server, io };
