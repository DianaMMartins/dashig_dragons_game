const mongoose = require("mongoose");
const { schemaForAll } = require('./schema')

const enemiesModel = new mongoose.model('Enemies', schemaForAll)
const towersModel = new mongoose.model('towers', schemaForAll)
const goalModel = new mongoose.model('Goals', schemaForAll)

module.exports = { enemiesModel, goalModel, towersModel}