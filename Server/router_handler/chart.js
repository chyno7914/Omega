const db = require("../db/init");
exports.detailChart = (req, res, next) => {
  const proven = req.query;
  const sql = `SELECT major name,COUNT(*) value
    FROM omega_students t1
    LEFT JOIN omega_tower t2 ON t1.tid = t2.tid
    WHERE tname = "${proven.flat}"
    AND t1.status != 204
    GROUP BY major`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.send({
      status: 0,
      data: results,
    });
  });
};
