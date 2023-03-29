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

const playerScore = {
  name: 'Sarah',
  score: 11
}

postPlayerScore(playerScore).then((data) => {

  console.log(' in sever ' + data)
})

io.on("connection", (socket) => {
  getEnemies().then((data) => { });
  getTowers().then((data) => { });
  getGoal().then((data) => { });



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
