const db = require("../db/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const path = require("path");
const fs = require("fs");
function locateSequenceQuery(n) {
  let query = "SELECT 1 AS num";
  for (let i = 2; i <= n; i++) {
    query += ` UNION ALL SELECT ${i}`;
  }
  return query;
}
exports.register = (req, res, next) => {
  const userinfo = req.body;
  const role = userinfo.role;
  let tid = null;
  const sql = "select * from omega_users where username = ?";
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) return next(err);
    if (results.length > 0) return next("用户名已存在");
    // const sql = "select tid from omega_tower where tcode = ?";
    let sqlAlter;
    if (role === 1)
      sqlAlter = `select sid from omega_students where sid = '${userinfo.sid}' and status != '204' and uid is null`;
    else if (role > 1)
      sqlAlter = `select tid from omega_tower where tcode = '${userinfo.tcode}'`;
    db.query(sqlAlter, (err, results) => {
      if (role > 1) {
        userinfo.sid = null;
        if (err) return next(err);
        if (results.length == 0) return next("校验码错误");
        tid = results[0].tid;
      } else if (role === 1) {
        if (err) return next(err);
        if (results.length == 0) return next(sqlAlter);
      }
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);
      const sql = "insert into omega_users set ?";
      db.query(
        sql,
        {
          username: userinfo.username,
          password: userinfo.password,
          telephone: userinfo.telephone,
        },
        (err, results) => {
          if (err) return next(err);
          const sql = `select uid from omega_users where username = '${userinfo.username}'`;
          db.query(sql, (err, results) => {
            if (err) return next(err);
            const uid = results[0].uid;
            const sql = `insert into omega_grant set ?`;
            db.query(sql, { uid, role }, (err, results) => {
              if (err) return next(err);
              if (role === 0) {
                if (err) return next(err);
                res.cc("注册成功", 0);
              } else {
                if (role > 1) {
                  const sql = `insert into omega_admin set ?`;
                  db.query(
                    sql,
                    {
                      uid,
                      tid,
                    },
                    (err, results) => {
                      if (err) return next(err);
                      res.cc("注册成功", 0);
                    }
                  );
                } else {
                  const sql = `update omega_students set uid = ${uid} where sid = ${userinfo.sid}`;
                  db.query(sql, (err, results) => {
                    if (err) return next(err);
                    res.cc("注册成功", 0);
                  });
                }
              }
            });
          });
        }
      );
    });
  });
};
exports.login = (req, res, next) => {
  const userinfo = req.body;
  const sql = `SELECT 
              t1.uid, 
              t1.username,
              t2.rid,
              t2.sid,
              t2.sname,
              t5.tname,
              t5.tid,
              t1.user_pic,
              password
            FROM 
              omega_users t1 
              LEFT JOIN omega_students t2 ON t1.uid = t2.uid 
              LEFT JOIN omega_admin t3 ON t1.uid = t3.uid 
              LEFT JOIN omega_room t4 ON t2.rid = t4.rid and t2.tid = t4.tid
              LEFT JOIN omega_tower t5 ON COALESCE(t3.tid, t4.tid) = t5.tid
            WHERE username = ?`;
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
    const { uid, rid, tname, sid, sname, username, tid, user_pic } = results[0];
    const sql = `SELECT uid,CODE FROM omega_grant
                RIGHT JOIN omega_order ON omega_grant.role = omega_order.role
                WHERE uid = ${uid}`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      const permission = results.map((item) => `${item.uid}:${item.CODE}`);
      const sql = `SELECT kind,responsiless FROM omega_applimit t1
                  LEFT JOIN omega_grant t2 ON t2.role = t1.protagonist
                  WHERE uid = ${uid}`;
      db.query(sql, (err, result) => {
        if (err) return next(err);
        res.send({
          status: 0,
          message: "登录成功",
          uid,
          rid,
          sid,
          sname,
          tname,
          permission,
          username,
          tid,
          attribution: result,
          user_pic,
          token: "Bearer " + tokenStr,
        });
      });
    });
  });
};
exports.census = (req, res, next) => {
  const userinfo = req.body;
  const sql = "select role from omega_grant where uid = ?";
  db.query(sql, [userinfo.uid], (err, results) => {
    if (err) return next(err);
    const role = results.map((item) => item.role);
    const sql = "select * from omega_students where uid = ?";
    db.query(sql, [userinfo.uid], (err, results) => {
      if (err) return next(err);
      if (results.length > 0 && role.include(1))
        return next("您已完成信息完善");
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
        const uid = role.some((num) => num === 0 || num === 1)
          ? userinfo.uid
          : null;
        const sql = `SELECT rid, tname, omega_tower.tid, tgender,tol_bed vivosphere
                      FROM omega_room 
                      LEFT JOIN omega_tower ON omega_room.tid = omega_tower.tid 
                      LEFT JOIN omega_floor ON omega_floor.floor = omega_room.floor
                      WHERE use_bed < tol_bed AND (tgender = ? OR tgender IS NULL) 
                      AND omega_room.status != 304
                      AND omega_floor.status != 404
                      AND omega_tower.status != 504
                      AND omega_room.number <= omega_floor.max_room
                      ORDER BY omega_room.rid 
                      LIMIT 1`;
        db.query(sql, userinfo.gender, (err, results) => {
          if (err) return next(err);
          if (results.length == 0)
            return next("宿舍空余不足，请联系管理员，并在稍后重试");
          const sql = "insert into omega_students set ?";
          const { rid, tname, tid, vivosphere } = results[0];
          db.query(
            sql,
            {
              uid: uid,
              sid: userinfo.sid,
              sname: userinfo.sname,
              gender: Number(userinfo.gender),
              birth: formattedDate,
              census: userinfo.census,
              major: userinfo.major,
              grade: userinfo.grade,
              class: userinfo.class,
              rid,
              tid,
            },
            (err, results) => {
              if (err) return next(err);
              const sql = `UPDATE omega_students SET bid = (
                SELECT new_bid FROM (
                    SELECT MIN(num) AS new_bid FROM (
                        ${locateSequenceQuery(vivosphere)}
                    ) t1 WHERE num NOT IN (
                        SELECT bid FROM omega_students WHERE rid = ? 
                        AND tid = ?
                        AND bid IS NOT NULL AND STATUS != 204
                        )
                    ) t2
                ) WHERE sid = ?`;
              db.query(sql, [rid, tid, userinfo.sid], (err, results) => {
                if (err) return next(err);
                const sql = `UPDATE omega_room SET use_bed = use_bed + 1 ,
                                status = CASE 
                                            WHEN tol_bed = use_bed THEN 302
                                            ElSE 300
                                         END
                                WHERE rid = ${rid}`;
                db.query(sql, (err, results) => {
                  if (err) return next(err);
                  const sql = `UPDATE omega_tower
                            SET tgender = ${userinfo.gender},
                                status = CASE
                                            WHEN (SELECT COUNT(*) FROM omega_room 
                                                    WHERE tid = ${tid}
                                                    AND (status = 300 or status = 301) = 0
                                                ) THEN 402
                                            ELSE 400
                                        END
                            WHERE tid = ${tid} AND tgender IS NULL;`;
                  db.query(sql, (err, results) => {
                    if (err) return next(err);
                    const sql = `update omega_grant set role = 1 where uid = ? and role = 0;`;
                    db.query(sql, userinfo.uid, (err, results) => {
                      if (err) return next(err);
                      if (role.some((num) => num === 2 || num === 3)) {
                        res.cc(`已分配至${tname}${rid}室`, 0);
                      } else res.cc(`欢迎入住${tname}${rid}室`, 0);
                    });
                  });
                });
              });
            }
          );
        });
      });
    });
  });
};
exports.portrait = (req, res, next) => {
  const {
    file,
    body: { uid },
  } = req;
  const fpath = path.join(__dirname, "../public/images", file.originalname);
  fs.readFile(file.path, (err, data) => {
    fs.writeFile(fpath, data, (err) => {
      if (err) return res.send({ status: 1, message: "上传失败" });
      else {
        console.log(file.originalname);
        const sql = `update omega_users set user_pic = '${file.originalname}' where uid = ${uid}`;
        console.log(sql);
        db.query(sql, (err, result) => {
          if (err) return next(err);
          fs.unlinkSync(file.path);
          res.send({
            status: 0,
            message: "上传成功",
            src: file.originalname,
          });
        });
      }
    });
  });
};
exports.cure = (req, res, next) => {
  const { uid } = req.query;
  const sql = `SELECT user_pic,telephone,t6.call ,gender,sid,sname,tname,rid,census,birth
              FROM omega_users t1
              LEFT JOIN omega_students t2 ON t1.uid = t2.uid
              LEFT JOIN omega_tower t3 ON t2.tid = t3.tid
              LEFT JOIN (
              SELECT t4.uid,t5.*
              FROM omega_grant t4
              JOIN omega_role t5 ON t4.role = t5.role
              WHERE t4.uid = ${uid}
                        )t6 ON t1.role = t6.role
              WHERE t1.uid = ${uid}`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    console.log(result[0]);
    res.cc(result[0], 0);
  });
};
exports.setUname = (req, res, next) => {
  const { alternative, uid } = req.body;
  const sql = `select * from omega_users where username = "${alternative}"`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (result.length) return next("好名字已被抢先，下次在来吧");
    const sql = `update omega_users set username = "${alternative}" where uid = ${uid}`;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      res.cc("修改成功", 0);
    });
  });
};
exports.setPhone = (req, res, next) => {
  const { alternative, uid } = req.body;
  const sql = `update omega_users set telephone = "${alternative}" where uid = ${uid}`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc("修改成功", 0);
  });
};
exports.changePassword = (req, res, next) => {
  const { oldPassword, newPassword, uid } = req.body; // 获取当前登录用户的 UID

  // 先查询当前用户是否存在
  const sqlSelect = "SELECT * FROM omega_users WHERE uid = ?";
  db.query(sqlSelect, [uid], (err, result) => {
    if (err) return next(err);
    if (result.length === 0) return next("用户不存在");

    // 验证旧密码是否正确
    const user = result[0];
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return next("旧密码不正确");
    }

    // 更新用户密码
    const sqlUpdate = "UPDATE omega_users SET password = ? WHERE uid = ?";
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);
    db.query(sqlUpdate, [newHashedPassword, uid], (err, result) => {
      if (err) return next(err);
      res.cc("密码修改成功", 0);
    });
  });
};
exports.studentenausweis = (req, res, next) => {
  const { uid } = req.query;
  const sql = ``;
};
