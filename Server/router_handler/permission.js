const express = require("express");
const router = express.Router();
const db = require("../db/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
// express router.post("/token", (req, res, next) => {
//   res.cc("校验成功", 0);
// });
exports.permission = (req, res, next) => {
  //  "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE username = ?) or role is null Order By level";
  const proven = req.query;
  const sql =
    "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE uid = ?) or role is null Order By level";
  db.query(sql, [proven.uid], (err, results) => {
    if (err) return next(err);
    const route = results;
    const sql =
      "SELECT * FROM omega_menu WHERE MID IN (SELECT MID FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE uid = ?) OR role IS NULL ORDER BY LEVEL)";
    db.query(sql, [proven.uid], (err, results) => {
      if (err) return next(err);
      const menu = results;
      const sql = "select * from omega_users where uid = ?";
      db.query(sql, proven.uid, (err, results) => {
        if (err) return next(err);
        res.send({
          status: 0,
          message: "校验成功",
          route: route,
          menu: menu,
          username: results[0].username,
          role: results[0].role,
        });
      });
    });
  });
};