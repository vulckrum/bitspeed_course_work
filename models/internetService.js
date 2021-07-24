const { Schema, model } = require('mongoose')
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    limited: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})
module.exports = model("InternetServise", schema)