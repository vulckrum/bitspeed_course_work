const { Schema, model } = require('mongoose')
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})
module.exports = model("Personal", schema)