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
app.use(cors({ origin: "*" }));
app.use(express.json());

<<<<<<< HEAD
const { getEnemies } = require("./controllers/gameControllers");

io.on("connection", (socket) => {
  getEnemies().then((data) => {});
=======
const {
  getEnemies,
  getTowers,
  getGoals,
} = require("./controllers/gameControllers");

io.on("connection", (socket) => {
  getEnemies().then((data) => {});
  getTowers().then((data) => {});
  getGoals().then((data) => {});
>>>>>>> 7e5cd89aa09eabe5859a8b0e56bb7875af7f435f

  console.log(socket.id, "connected");
  socket.emit("Hello", "world");
  // socket.on("Hello", () => {

  //   socket.emit("Bye' ());
  // });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

const db = mongoose
  .connect(
    "mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game"
  )
  .then(() => {
    server.listen(4040);
  });

module.exports = { server, io, app };
