const db = require("../db/init");
exports.permission = (req, res, next) => {
  //  "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE username = ?) or role is null Order By level";
  const proven = req.query;
  const sql =
    "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_grant WHERE uid = ?) or role is null Order By level,weight DESC";
  db.query(sql, [proven.uid], (err, results) => {
    if (err) return next(err);
    const route = results;
    const sql =
      "SELECT * FROM omega_menu WHERE MID IN (SELECT MID FROM omega_route WHERE role IN (SELECT role FROM omega_grant WHERE uid = ?) OR role IS NULL ORDER BY LEVEL)";
    db.query(sql, [proven.uid], (err, results) => {
      if (err) return next(err);
      const menu = results;
      const sql = `select username,t2.role
                  from omega_users t1
                  join omega_grant t2 on t1.uid = t2.uid
                  where t1.uid = ${proven.uid}`;
      db.query(sql, proven.uid, (err, results) => {
        if (err) return next(err);
        const username = results[0].username;
        const role = results[0].role;
        if (err) return next(err);
        const sql = `SELECT uid,CODE FROM omega_grant
                    RIGHT JOIN omega_order ON omega_grant.role = omega_order.role
                    WHERE uid = ${proven.uid}`;
        db.query(sql, (err, results) => {
        if (err) return next(err);
        const permission = results.map((item) => `${item.uid}:${item.CODE}`);
        res.send({
          status: 0,
          message: "校验成功",
          route: route,
          menu: menu,
          role,
          username,
          permission
        });
      })
      });
    });
  });
};
