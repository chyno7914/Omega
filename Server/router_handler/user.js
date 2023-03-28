const db = require("../db/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
exports.register = (req, res, next) => {
  const userinfo = req.body;
  let tid = null;
  const sql = "select * from omega_users where username = ?";
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) return next(err);
    if (results.length > 0) return next("用户名已存在");
    const sql = "select tid from omega_tower where tcode = ?";
    db.query(sql, userinfo.tcode, (err, results) => {
      if (userinfo.role) {
        userinfo.sid = null;
        if (err) return next(err);
        if (results.length == 0) return next("校验码错误");
        tid = results[0].tid;
      }
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);
      const sql = "insert into omega_users set ?";
      db.query(
        sql,
        {
          username: userinfo.username,
          password: userinfo.password,
          role: userinfo.role,
          telephone: userinfo.telephone,
          tid: tid,
        },
        (err, results) => {
          if (err) return next(err);
          res.cc("注册成功", 0);
        }
      );
    });
  });
};
exports.login = (req, res, next) => {
  const userinfo = req.body;
  const sql = "select * from omega_users where username = ?";
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) return next(err);
    if (results.length == 0) return next("用户名不存在");
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) return next("密码错误");
    const user = { ...results[0], password: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
