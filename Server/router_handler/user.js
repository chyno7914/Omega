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
      expiresIn: "30h",
    });
    res.send({
      status: 0,
      message: "登录成功",
      uid: results[0].uid,
      token: "Bearer " + tokenStr,
    });
  });
};
exports.census = (req, res, next) => {
  const userinfo = req.body;
  const sql = "select role from omega_users where uid = ?";
  db.query(sql, [userinfo.uid], (err, results) => {
    if (err) return next(err);
    const role = results[0].role;
    const sql = "select * from omega_students where uid = ?";
    db.query(sql, [userinfo.uid], (err, results) => {
      if (err) return next(err);
      if (results.length > 0 && role < 2) return next("您已完成信息完善");
      const sql = "select * from omega_students where sid = ?";
      db.query(sql, [userinfo.sid], (err, results) => {
        if (err) return next(err);
        if (results.length > 0) return next("学号已被注册");
        const dateObj = new Date(userinfo.birth);
        dateObj.setDate(dateObj.getDate() + 1);
        const formattedDate = dateObj
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const sql = "insert into omega_students set ?";
        db.query(
          sql,
          {
            uid: userinfo.uid,
            sid: userinfo.sid,
            sname: userinfo.sname,
            gender: Number(userinfo.gender),
            birth: formattedDate,
            census: userinfo.census,
            major: userinfo.major,
            grade: userinfo.grade,
            class: userinfo.class,
          },
          (err, results) => {
            if (err) return next(err);
            const sql = `SELECT rid, tname, omega_tower.tid, tgender
                        FROM omega_room 
                        LEFT JOIN omega_tower ON omega_room.tid = omega_tower.tid 
                        WHERE use_bed < tol_bed AND (tgender IN (SELECT gender FROM omega_students WHERE uid = 47) OR tgender IS NULL) 
                        ORDER BY omega_room.rid 
                        LIMIT 1`;
            db.query(sql, userinfo.uid, (err, results) => {
              if (err) return next(err);
              if (results.length == 0)
                return next("宿舍空余不足，请联系管理员，并在稍后重试");
              const rid = results[0].rid;
              const tname = results[0].tname;
              const tgender = results[0].tgender;
              const tid = results[0].tid;
              const sql = `UPDATE omega_tower
                        SET tgender = (
                          SELECT gender
                          FROM omega_students 
                          WHERE uid = ?
                        )
                        WHERE tid = ? AND tgender IS NULL;`;
              db.query(sql, [userinfo.uid, tid], (err, results) => {
                if (err) return next(err);
                const sql =
                  "UPDATE omega_students " + "SET rid = ? " + "WHERE uid = ?;";
                db.query(sql, [rid, userinfo.uid], (err, results) => {
                  if (err) return next(err);
                  const sql =
                    "UPDATE omega_room " +
                    "SET use_bed = use_bed + 1 " +
                    "WHERE rid = ?;";
                  db.query(sql, rid, (err, results) => {
                    if (err) return next(err);
                    const sql =
                      "UPDATE omega_students SET bid = (" +
                      "SELECT new_bid FROM (" +
                      "SELECT MIN(t1.bid_seq) AS new_bid FROM (" +
                      "SELECT 1 AS bid_seq UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6" +
                      ") t1 WHERE t1.bid_seq NOT IN (SELECT bid FROM omega_students WHERE bid BETWEEN 1 AND 6 AND rid = ? AND bid IS NOT NULL)" +
                      ") t2" +
                      ") WHERE uid = ?;";
                    db.query(sql, [rid, userinfo.uid], (err, results) => {
                      if (err) return next(err);
                      const sql = `update omega_users set role = 1 where uid = ? and role = 0;`;
                      db.query(sql, userinfo.uid, (err, results) => {
                        if (err) return next(err);

                        res.cc(`欢迎入住${tname}${rid}室`, 0);
                      });
                    });
                  });
                });
              });
            });
          }
        );
      });
    });
  });
};
