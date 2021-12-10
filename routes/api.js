var express = require("express");
var resortRoute = require("./resort-route");
var roomsRoute = require("./rooms-route");
var adminRoute = require("./admin-route");

var app = express();

app.use("/resort/", resortRoute);
app.use("/rooms/", roomsRoute);
app.use("/admin/", adminRoute);

module.exports = app;
