const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5731",
  },
});
const cors = require("cors");
const apiRouter = require("./router/api");
const expressJWT = require("express-jwt");
const config = require("./config");
const registerSocketEvents = require("./socket");
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
app.use(apiRouter);
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") return res.cc("身份验证错误");
  return res.cc(err);
});

app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({
    path: [/^\/api\//, /^\/images\//],
  })
);
registerSocketEvents(io);
server.listen(3008, () => {
  console.log("api omega_base running in 127.0.0.1:3008");
});
