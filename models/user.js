const { Schema, model } = require('mongoose')
const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    servise: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authHash: {
        type: String,
        required: true,
        default: "not hash"
    },

})
module.exports = model("user", schema)