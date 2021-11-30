var express = require("express");
var router = express.Router();
const ResortController = require("../controlers/ResortController");

router.post("/add", ResortController.resortCreate);
router.get("/list", ResortController.resortList);
router.post("/autocomplete", ResortController.resortAutoComplete);
router.get("/details/:resortId", ResortController.resortDetails);
router.delete("/delete/:resortId", ResortController.resortDelete);
router.put("/update/:resortId", ResortController.resortUpdate);

module.exports = router;
