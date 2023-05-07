const db = require("../db/init");
exports.permission = (req, res, next) => {
  //  "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE username = ?) or role is null Order By level";
  const proven = req.query;
  const sql =
    "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_grant WHERE uid = ?) or role is null Order By level";
  db.query(sql, [proven.uid], (err, results) => {
    if (err) return next(err);
    const route = results;
    const sql =
      "SELECT * FROM omega_menu WHERE MID IN (SELECT MID FROM omega_route WHERE role IN (SELECT role FROM omega_grant WHERE uid = ?) OR role IS NULL ORDER BY LEVEL)";
    db.query(sql, [proven.uid], (err, results) => {
      if (err) return next(err);
      const menu = results;
      const sql = "select username from omega_users where uid = ?";

      db.query(sql, proven.uid, (err, results) => {
        if (err) return next(err);
        const username = results[0];
        if (err) return next(err);
        res.send({
          status: 0,
          message: "校验成功",
          route: route,
          menu: menu,
          username: username,
        });
      });
    });
  });
};
