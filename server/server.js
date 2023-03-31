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

let enemyLevel1 = [];
let enemiesGroup = [];
let playerIds = [];
let players = [];
const enemyPositionsX = [];
const enemyPositionsXRight = [];
const enemyPositionsY = [];

for (let i = 0; i < 10; i++) {
  const randomY = Math.floor(Math.random() * 5);
  enemyPositionsY.push(randomY);
  const randomX = -(
    Math.floor(Math.floor(Math.random() * 1080) / 100) * 180
  );
  enemyPositionsX.push(randomX);
  const randomXRight = (
    Math.floor(Math.floor(Math.random() * 1080) / 100) * 180
  );
  enemyPositionsXRight.push(randomXRight);
}

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
   
    // getEnemies().then((enemyData) => {
      //   //set enemy x here! (random x positions) * 10 in an array
      
      //   // set enemy y here (random number between 0 and 4) *10 in an array
      //   enemiesGroup = enemyData;
      // });
      // socket.emit("getEnemiesGroup", enemiesGroup);
    }
    
    socket.on('enemiesCreated', ()=>{
      socket.emit('enemyPosition', enemyPositionsX, enemyPositionsY, enemyPositionsXRight)
      console.log(enemyPositionsX);
      console.log(enemyPositionsY);
  })

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
