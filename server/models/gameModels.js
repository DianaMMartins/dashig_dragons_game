const mongoose = require("mongoose");
const { schemaForAll } = require("./schema");

const enemiesModel = new mongoose.model("Enemies", schemaForAll);
const playerModel = new mongoose.model("Players", schemaForAll);
const towersModel = new mongoose.model("towers", schemaForAll);
const goalModel = new mongoose.model("Goals", schemaForAll);
const scoresModel = new mongoose.model("Scores", schemaForAll);

module.exports = {
  enemiesModel,
  goalModel,
  towersModel,
  playerModel,
  scoresModel,
};
