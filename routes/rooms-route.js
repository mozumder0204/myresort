var express = require("express");
var router = express.Router();
const RoomsController = require("../controlers/RoomsController");

router.post("/add", RoomsController.roomCreate);
router.get("/list/", RoomsController.roomList);
router.get("/list/:resortId", RoomsController.roomListByResortId);
router.get("/details/:resortId/:roomId", RoomsController.roomDetails);
router.delete("/delete/:roomId", RoomsController.roomDelete);
module.exports = router;
