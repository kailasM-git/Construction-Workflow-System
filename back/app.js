var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
var app = express();
// Setting up enivronment variables
dotenv.config();
var fileUpload = require("express-fileupload");
var database = require("./config/database");
var session = require("express-session");

const paymentRoute = require("./routes/paymentRoute");

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use(express.static("assect"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
database();

var consultrouter = require("./routes/consultroutes");
const chatRoutes = require("./routes/chat.routes");

app.use("/consultant", consultrouter);
app.use("/api/payment/", paymentRoute);
app.use("/api/chat/", chatRoutes);

app.listen(4000);
