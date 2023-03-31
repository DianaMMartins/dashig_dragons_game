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

let enemyLevel1 = []
let enemiesGroup = []
let playerIds = [];
let players = [];

io.on("connection", (socket) => {

  //check players are there and ready to play
  io.emit('', enemyLevel1)
  // getEnemies().then((enemyData) => {
  //   console.log(enemyData)
  //   const enemyTemplate = {
  //     health: enemyData[0].health,
  //     attackDamage: enemyData[0].attackDamage,
  //     coinsOnKill: enemyData[0].coinsOnKill,
  //     walkSpeed: enemyData[0].walkSpeed,
  //     level:enemyData[0].level
  //   }
  //   enemiesGroup = [{ ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }, { ...enemyTemplate }]

  // });

  getEnemies().then((enemyData) => {
    enemiesGroup = enemyData
  });
  socket.emit('getEnemiesGroup', (enemiesGroup))


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

	socket.on("updatePlayerOnePosition", (data, direction) => {
		if (players.length===2) {
			players[0].location.y = data;
			socket.broadcast.emit(
				"updatePlayerOnePosition",
				players[0].location,
				direction
			);
		}
	});

	socket.on("updatePlayerTwoPosition", (data, direction) => {
		if (players.length===2) {
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
