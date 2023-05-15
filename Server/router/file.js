const express = require("express");
const expressJoi = require("@escook/express-joi");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

// 配置 multer 中间件
const router = express.Router();
router.post(
  "/portrait",
  upload.single("file"),
  (req, res, next) => {
    res.send("上传成功");
  },

  function (err, req, res, next) {
    // 处理上传文件错误，例如文件大小超出限制等
    console.error(err);
    res.status(500).send("文件上传失败");
  }
);
// module.exports = router;
