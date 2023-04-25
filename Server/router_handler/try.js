const express = require("express");
const db = require("../db/init");

exports.census = (req, res, next) => {
  const userinfo = req.body;
  const sql = "select role from omega_users where uid = ?";
  db.query(sql, [userinfo.uid], (err, results) => {
    if (err) return next(err);
    const role = results[0].map((item) => item.role);
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
        const sql = `SELECT rid, tname, omega_tower.tid, tgender
                    FROM omega_room 
                    LEFT JOIN omega_tower ON omega_room.tid = omega_tower.tid 
                    WHERE use_bed < tol_bed AND (tgender = ? OR tgender IS NULL) 
                    ORDER BY omega_room.rid 
                    LIMIT 1`;
        db.query(sql, userinfo.gender, (err, results) => {
          if (err) return next(err);
          if (results.length == 0)
            return next("宿舍空余不足，请联系管理员，并在稍后重试");
          const rid = results[0].rid;
          const tname = results[0].tname;
          const tgender = results[0].tgender;
          const tid = results[0].tid;
          const sql = "insert into omega_students set ?";
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
            },
            (err, results) => {
              if (err) return next(err);
              const sql = `UPDATE omega_tower
                        SET tgender = (
                          SELECT gender
                          FROM omega_students 
                          WHERE sid = ?
                        )
                        WHERE tid = ? AND tgender IS NULL;`;
              db.query(sql, [userinfo.sid, tid], (err, results) => {
                if (err) return next(err);
                const sql =
                  "UPDATE omega_students " + "SET rid = ? " + "WHERE sid = ?;";
                db.query(sql, [rid, userinfo.sid], (err, results) => {
                  if (err) return next(err);
                  const sql =
                    "UPDATE omega_room " +
                    "SET use_bed = use_bed + 1 " +
                    "WHERE rid = ?;";
                  db.query(sql, rid, (err, results) => {
                    if (err) return next(err);
                    const sql = `UPDATE omega_students SET bid = (
                      SELECT new_bid FROM (
                        SELECT MIN(t1.bid_seq) AS new_bid FROM (
                          SELECT 1 AS bid_seq UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
                        ) t1 WHERE t1.bid_seq NOT IN (
                          SELECT bid FROM omega_students WHERE bid BETWEEN 1 AND 6 AND rid = ? AND bid IS NOT NULL AND status != 204
                        )
                      ) t2
                    ) WHERE sid = ?`;
                    db.query(sql, [rid, userinfo.sid], (err, results) => {
                      if (err) return next(err);
                      const sql = `update omega_grand set role = 1 where uid = ? and role = 0;`;
                      db.query(sql, userinfo.uid, (err, results) => {
                        if (err) return next(err);
                        res.cc(`欢迎入住${tname}${rid}室`, 0);
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
  });
};
