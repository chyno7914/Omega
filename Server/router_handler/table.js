const express = require("express");
const router = express.Router();
const db = require("../db/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { string, array, number, object } = require("joi");
const { result } = require("@hapi/joi/lib/base");
const { type } = require("@hapi/joi/lib/extend");
// express router.post("/token", (req, res, next) => {
//   res.cc("校验成功", 0);
// });
const isNihility = (value) => {
  if (value == null || value == undefined) return 1;
  return 0;
};
const toPartial = (value) => {
  if (isNihility(value)) return undefined;
  return `'%${value}%'`;
};
const toDisperse = (value) => {
  if (typeof value === "object") return `('${value.join("','")}')`;
  return undefined;
};
const toCommon = (value) => {
  if (typeof value === "string") return `'${value}'`;
  return undefined;
};

exports.chum = (req, res, next) => {
  //  "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE username = ?) or role is null Order By level";
  const userinfo = req.query;
  userinfo.currentPage = userinfo.currentPage ?? 1;
  userinfo.pageSize = userinfo.pageSize ?? 0;
  userinfo.major = userinfo.major ? eval(userinfo.major) : undefined;
  userinfo.grade = userinfo.grade ? eval(userinfo.grade) : undefined;
  userinfo.class = userinfo.class ? eval(userinfo.class) : undefined;
  const sql = `SELECT uid,sid,sname,t1.rid,major,grade,class,tname FROM omega_students t1
                LEFT JOIN omega_room t2 ON t1.rid = t2.rid
                LEFT JOIN omega_tower t3 ON t2.tid = t3.tid
                where ${
                  isNihility(userinfo.sid)
                    ? "true"
                    : "sid like " + toPartial(userinfo.sid)
                }
                ${
                  isNihility(userinfo.sname)
                    ? ""
                    : "and sname like " + toPartial(userinfo.sname)
                }
                ${
                  isNihility(userinfo.room)
                    ? ""
                    : "and t1.rid like " + toPartial(userinfo.room)
                }
                ${
                  isNihility(toDisperse(userinfo.grade))
                    ? ""
                    : "and grade in " + toDisperse(userinfo.grade)
                }
                ${
                  isNihility(toDisperse(userinfo.major))
                    ? ""
                    : "and major in " + toDisperse(userinfo.major)
                }
                ${
                  isNihility(userinfo.flat)
                    ? ""
                    : "and tname = " + toCommon(userinfo.flat)
                }
                ${
                  isNihility(toDisperse(userinfo.class))
                    ? ""
                    : "and class in " + toDisperse(userinfo.class)
                }
                order by uid ${eval(userinfo.flag) ? "asc" : "desc"}
                ${
                  userinfo.pageSize
                    ? "limit " +
                      userinfo.pageSize +
                      " offset " +
                      (userinfo.currentPage - 1) * userinfo.pageSize
                    : ""
                }`;

  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.cc(results, 0);
  });
};
exports.estimate = (req, res, next) => {
  const testimony = req.query;
  const sql = `SELECT name FROM omega_ferry 
                LEFT JOIN omega_table ON stack = sequence
                WHERE librakey = '${testimony.librakey}'`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (result.length < 1) return next("键值异常");
    const name = result[0].name;
    const sql = `select COUNT(*) as total from ${name}`;
    db.query(
      sql,
      (err,
      (err, result) => {
        if (err) return next(err);
        res.send({
          status: 0,
          message: "连接成功",
          gross: result[0].total,
        });
      })
    );
  });
};
exports.tname = (req, res, next) => {
  const userinfo = req.query;
  const sql = `select tname from omega_tower where tid>0`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    const tnameList = results.map((item) => item.tname);
    res.cc(tnameList, 0);
  });
};
