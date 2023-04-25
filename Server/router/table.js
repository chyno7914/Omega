const express = require("express");
const router = express.Router();
const tableHandler = require("../router_handler/table");
router.get("/chum", tableHandler.chum);
router.get("/tname", tableHandler.tname);
router.get("/estimate", tableHandler.estimate);
router.get("/room", tableHandler.room);
router.post("/chum/delete", tableHandler.chumDelete);
router.get("/ceiling", tableHandler.getFloorCount);
router.post("/room/add", tableHandler.addRoom);
router.get("/admin/floor/search", tableHandler.adminFloorSearch);
router.post("room/ban", tableHandler.banRoom);
module.exports = router;
