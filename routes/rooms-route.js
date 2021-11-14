var express = require("express");
var router = express.Router();
const RoomsController = require("../controlers/RoomsController");

router.post("/add", RoomsController.roomCreate);

module.exports = router;
