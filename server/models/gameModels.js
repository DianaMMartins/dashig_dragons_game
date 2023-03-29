const mongoose = require("mongoose");
const { schemaForAll } = require('./schema')

const enemiesModel = new mongoose.model('Enemies', schemaForAll)
const towersModel = new mongoose.model('towers', schemaForAll)

module.exports = { enemiesModel, towersModel }
