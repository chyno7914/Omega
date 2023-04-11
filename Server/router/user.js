const express = require("express");
const expressJoi = require("@escook/express-joi");
const userHandler = require("../router_handler/user");
const { reg_schema } = require("../schema/user");
const { login_schema } = require("../schema/user");
const router = express.Router();
router.post("/api/register", expressJoi(reg_schema), userHandler.register);
router.post("/api/login", expressJoi(login_schema), userHandler.login);
router.post("/census", userHandler.census);

module.exports = router;
