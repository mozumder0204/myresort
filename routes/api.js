var express = require("express");
var resortRoute = require("./resort-route");

var app = express();

app.use("/resort/", resortRoute);

module.exports = app;
