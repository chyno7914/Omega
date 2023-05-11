const express = require("express");
const router = express.Router();
const chartHandler = require("../router_handler/chart");
router.get("/chart/detail", chartHandler.detailChart);
router.get("/chart/broad", chartHandler.broadSearch);
router.get("/chart/roll", chartHandler.majorRoll);
router.get("/chart/map", chartHandler.map);
router.get("/chart/list", chartHandler.list);
module.exports = router;
