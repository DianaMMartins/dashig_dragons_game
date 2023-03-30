const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaForAll = new Schema({});
const scoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }

},
    { versionKey: false }

)

module.exports = { schemaForAll, scoreSchema }