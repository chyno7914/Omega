const express = require("express");
const router = express.Router();
router.post("/token", (req, res, next) => {
  res.cc("校验成功", 0);
});
module.exports = router;
