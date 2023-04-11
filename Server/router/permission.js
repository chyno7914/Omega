const express = require("express");
const router = express.Router();
const permissionHandler = require("../router_handler/permission");
router.get("/permission", permissionHandler.permission);
module.exports = router;
