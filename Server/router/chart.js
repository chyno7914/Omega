const express = require("express");
const router = express.Router();
const chartHandler = require("../router_handler/chart");
router.get("/chart/detail", chartHandler.detailChart);
module.exports = router;
