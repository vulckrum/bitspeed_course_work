const express = require('express')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')
const routs = require('./routes/index');


const port = process.env.port || 3000
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname)
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "assets")))
app.use(routs)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:132569@cluster0.9r6zc.mongodb.net/bitspeed?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(port, () => {
            console.log("Server started \r\nPORT:" + port + '\n\r' + "URL:http://localhost:" + port)
        })
    } catch (e) {
        console.error(e)
    }
}
start();