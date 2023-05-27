const express = require("express");
const userRouter = require("./user");
const tokenRouter = require("./permission");
const tableRouter = require("./table");
const chartRouter = require("./chart");
const applyRouter = require("./apply");

const router = express.Router();

router.use(userRouter);
router.use(tokenRouter);
router.use(tableRouter);
router.use(chartRouter);
router.use(applyRouter);
module.exports = router;
