const mongoose = require("mongoose");
const { schemaForAll } = require('./schema')

const enemiesModel = new mongoose.model('Enemies', schemaForAll)
const playerModel = new mongoose.model('Players',schemaForAll)

module.exports = { enemiesModel,playerModel }
