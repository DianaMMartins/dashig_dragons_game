const mongoose = require("mongoose");
const { schemaForAll } = require("./schema");

const enemiesModel = new mongoose.model("Enemies", schemaForAll);
const scoresModel = new mongoose.model("Scores", schemaForAll);

module.exports = { enemiesModel, scoresModel };
