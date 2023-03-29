const mongoose = require("mongoose");
const { schemaForAll } = require('./schema')

const enemiesModel = new mongoose.model('Enemies', schemaForAll)

module.exports = { enemiesModel }
