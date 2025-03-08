const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', require('./router'));

const main = async () => {
    await mongoose.connect(process.env.MONGOOSEURL);
    app.listen(process.env.PORT);
};

main();
