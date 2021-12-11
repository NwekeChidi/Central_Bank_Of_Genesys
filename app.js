// Import Dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
//const routes = require('./routes');

// Intitialize express
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( (error, req, res, next) => {
    res.status(500).send({
        message: "Something Went Wrong",
        err : error.message
    })
})






// Route Ping
let count = 0;
app.get("/ping", async (req, res) => {
    count++;
    res.status(200).send(`Server Has Recieved ${count} Pings Since Server It Started`);
})


// Route 404
app.use("**", async (req, res) => {
    res.status(404).send("Route Not Found!");
})
// Listen
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
app.listen(PORT, async () =>{
    console.log(`Server Is Live On http//localhost/${PORT}`);

    try {
        await mongoose.connect(MONGODB_URI);
        console.log(":::> Connected To MongoDB Server.....!")
    } catch (error) {
        console.log("<:::: Could Not Connect To MongoDB Server....!")
    }
})