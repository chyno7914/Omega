const express = require("express");
const router = express.Router();
const tableHandler = require("../router_handler/table");
router.get("/chum", tableHandler.chum);
router.get("/tname", tableHandler.tname);
router.get("/estimate", tableHandler.estimate);
module.exports = router;
