module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("连接成功");
    socket.on("create-something", (data, callback) => {
      console.log("接收到前端发送过来的数据：", data);
      io.emit("have some success", "返回L:" + data);
      callback();
    });
    socket.on("disconnect", () => {
      console.log("连接断开");
    });
  });
};
