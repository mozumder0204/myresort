var express = require("express");
var resortRoute = require("./resort-route");
var roomsRoute = require("./rooms-route");

var app = express();

app.use("/resort/", resortRoute);
app.use("/rooms/", roomsRoute);

module.exports = app;
