const { Schema, model } = require('mongoose')
const user = require('./user')
const schema = new Schema({
    servise: {
        type: Array,
        required: true
    },
    perfomer: {
        type: Array,
        required: true,
        default: []
    },
    user: {
        type: String,
        required: true,
    },
    addres: {
        type: String,
        required: true,
    },
    mess: {
        type: String,
        required: false,
    }
})
module.exports = model("Order", schema)