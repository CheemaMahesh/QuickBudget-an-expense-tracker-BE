const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoose = async () => {
    await mongoose.connect(process.env.MONGOOSEURL);
}

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => connectToMongoose().catch(err => console.log("mongooseErr", err)));
