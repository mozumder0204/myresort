var express = require("express");
var cookieParser = require("cookie-parser");
var apiResponse = require("./helpers/response");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const expressValidator = require("express-validator");
var cors = require("cors");
var path = require("path");
var app = express();
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, "public")));
app.use('/files/images', express.static(path.join(__dirname + '/files/images')));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
