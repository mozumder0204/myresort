var express = require("express");
var router = express.Router();
const RoomsController = require("../controlers/RoomsController");

router.post("/add", RoomsController.roomCreate);
router.get("/list/:resortId", RoomsController.roomList);
router.get("/details/:resortId/:roomId", RoomsController.roomDetails);

module.exports = router;
