const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/user");
const tokenRouter = require("./router/permission");
const tableRouter = require("./router/table");
const chartRouter = require("./router/chart");
const expressJWT = require("express-jwt");
const config = require("./config");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    // console.log(err);
    return res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({
    path: [/^\/api\//, /^\/images\//],
  })
);

app.use(userRouter);
app.use(tokenRouter);
app.use(tableRouter);
app.use(chartRouter);
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") return res.cc("身份验证错误");
  return res.cc(err);
});
app.listen(3008, () => {
  console.log("api omega_base running in 127.0.0.1:3008");
});
