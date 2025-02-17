const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const connectToMongoose = async () => {
    await mongoose.connect(process.env.MONGOOSEURL);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', require('./router'));

app.listen(process.env.PORT, () => connectToMongoose().catch(err => console.log("mongooseErr", err)));
