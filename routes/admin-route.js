var express = require("express");
var router = express.Router();
const AdminController = require("../controlers/AdminController");

router.post("/add", AdminController.adminCreate);
router.get("/list", AdminController.adminList);
router.post("/signin", AdminController.adminSignin);

module.exports = router;
