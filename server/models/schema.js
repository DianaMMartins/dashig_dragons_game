const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaForAll = new Schema({});
const scoreSchema = new Schema({
    // player: {
    //     name: String,
    //     score: Number
    // }
    name: String,
    score: Number
    
},
    { versionKey: false }

)

module.exports = { schemaForAll, scoreSchema }