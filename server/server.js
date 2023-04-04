const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 4040;
const io = new Server(server, {
  cors: {
    origin: "https://dashing-dragon-fbfd86.netlify.app",
  },
});
const mongoose = require("mongoose");
require("dotenv").config();
const key = process.env.API_KEY;
app.use(cors({ origin: "*" }));
app.use(express.json());
const { getPlayer } = require("./controllers/gameControllers");

let playerIds = [];
let players = [];
let enemyPositionXLeft = [];
let enemyPositionsXRight = [];
let enemyPositionsY = [];
let enemyRequestCounter = 0;

for (let i = 0; i < 10; i++) {
  const randomY = Math.floor(Math.random() * 5);
  enemyPositionsY.push(randomY);
  const randomX = -(Math.floor(Math.floor(Math.random() * 1080) / 100) * 180);
  enemyPositionXLeft.push(randomX);
  const randomXRight =
    Math.floor(Math.floor(Math.random() * 1080) / 100) * 180 + 1920;
  enemyPositionsXRight.push(randomXRight);
}

io.on("connection", (socket) => {
  playerIds.push(socket.id);

  socket.emit("assignId", socket.id);

  if (playerIds.length > 2) {
    const idIndex = playerIds.indexOf(socket.id);
    playerIds.splice(idIndex, 1);
    socket.emit("serverFull");
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

  socket.on("enemiesCreated", () => {
    socket.emit("enemyPositionLeft", enemyPositionXLeft, enemyPositionsY);
    socket.emit("enemyPositionRight", enemyPositionsXRight, enemyPositionsY);
  });

  socket.on("updatePlayerOnePosition", (data, direction) => {
    if (players.length === 2) {
      players[0].location.y = data;
      socket.broadcast.emit(
        "updatePlayerOnePosition",
        players[0].location,
        direction
      );
    }
  });

  socket.on("updatePlayerTwoPosition", (data, direction) => {
    if (players.length === 2) {
      players[1].location.y = data;
      socket.broadcast.emit(
        "updatePlayerTwoPosition",
        players[1].location,
        direction
      );
    }
  });

  socket.on("player1shot", () => {
    io.emit("player1shot");
  });

  socket.on("player2shot", () => {
    io.emit("player2shot");
  });

  socket.on("generateNewEnemies", () => {
    enemyRequestCounter++;
    if (enemyRequestCounter === 2) {
      enemyPositionsY = [];
      enemyPositionXLeft = [];
      enemyPositionsXRight = [];
      for (let i = 0; i < 10; i++) {
        const randomY = Math.floor(Math.random() * 5);
        enemyPositionsY.push(randomY);

        const randomX = -(
          Math.floor(Math.floor(Math.random() * 1080) / 100) * 180
        );
        enemyPositionXLeft.push(randomX);
        const randomXRight =
          Math.floor(Math.floor(Math.random() * 1080) / 100) * 180 + 1920;
        enemyPositionsXRight.push(randomXRight);
      }
      io.emit("enemyPositionLeft", enemyPositionXLeft, enemyPositionsY);
      io.emit("enemyPositionRight", enemyPositionsXRight, enemyPositionsY);
      enemyRequestCounter = 0;
    }
  });

  socket.on("disconnect", () => {
    const idIndex = playerIds.indexOf(socket.id);
    playerIds.splice(idIndex, 1);

    if (playerIds.length < 2) {
      io.emit("gameOver");
    }
  });
});

const db = mongoose
  .connect(`mongodb+srv://newuser:${key}@pinder.skvgszw.mongodb.net/Game`)
  .then(() => {
    server.listen(PORT);
  });

module.exports = { server, io, app };
