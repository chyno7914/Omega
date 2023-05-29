const express = require("express");
const expressJoi = require("@escook/express-joi");
const multer = require("multer");
const applyHandler = require("../router_handler/apply");

const upload = multer({ dest: "uploads" });

// 配置 multer 中间件
const router = express.Router();
// router.post(
//   "/portrait",
//   upload.single("file"),
//   (req, res, next) => {
//     res.send("上传成功");
//   },
router.post("/apply/push", applyHandler.submitPush);
router.get("/apply/search", applyHandler.submitSearch);
router.get("/apply/continue", applyHandler.submitContinue);
router.get("/apply/permission", applyHandler.submitSearchTokenCheck);
router.get("/apply/attribution", applyHandler.gatherItemAttribute);
router.post("/apply/delete", applyHandler.submitDelete);
router.get("/apply/detail", applyHandler.submitDetail);
router.post("/apply/accept/repair", applyHandler.aceeptRepair);
//   function (err, req, res, next) {
//     // 处理上传文件错误，例如文件大小超出限制等
//     console.error(err);
//     res.status(500).send("文件上传失败");
//   }
// );
module.exports = router;
