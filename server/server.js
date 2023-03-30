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

const {
  getEnemies,
  getTowers,
  getGoal,
  getPlayer,
  getGameScore,
  postPlayerScore,
} = require("./controllers/gameControllers");

let playerIds = [];
let players = [];

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  if (playerIds.length < 2) {
    playerIds.push(socket.id);

    socket.emit("assignId", socket.id);
  }

  if (playerIds.length === 2) {
    io.emit("sendAllIds", playerIds);
    getPlayer().then((playerData) => {
      const playerTemplate = {
        location: { y: 0 },
        health: playerData[0].health,
        coins: playerData[0].coins,
        weapon: playerData[0].weapon,
      };

      players = [{ ...playerTemplate }, { ...playerTemplate }];
    });
  }

  socket.on("updatePlayerOnePosition", (data) => {
    players[0].location.y = data;
    socket.broadcast.emit("updatePlayerOnePosition", players[0].location);
  });

  socket.on("updatePlayerTwoPosition", (data) => {
    players[1].location.y = data;
    socket.broadcast.emit("updatePlayerTwoPosition", players[1].location);
  });

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
