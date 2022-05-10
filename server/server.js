require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

//connect to mongodb
connectDB();

const app = express();
const PORT = process.env.PORT || 5500;

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
//to parse json
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/emp',require('./routes/employee'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use("/", require("./routes/basic"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

