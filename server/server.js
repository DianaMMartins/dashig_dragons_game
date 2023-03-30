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
  postPlayerScore
} = require("./controllers/gameControllers");

let enemyLevel1 = []
let enemiesGroup = []

io.on("connection", (socket) => {

  //check players are there and ready to play
  io.emit('', enemyLevel1)
  getEnemies().then((enemyData) => {
    console.log(enemyData)

   
    const enemyTemplate = {
      health: enemyData[0].health,
      attackDamage: enemyData[0].attackDamage,
      coinsOnKill: enemyData[0].coinsOnKill,
      walkSpeed: enemyData[0].walkSpeed,
      level:enemyData[0].level
    }

    enemiesGroup = [{ ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }]
    console.log(enemiesGroup)


  });





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
