var express = require("express");
var router = express.Router();
const ResortController = require("../controlers/ResortController");

router.get("/add", ResortController.createResort);

module.exports = router;
