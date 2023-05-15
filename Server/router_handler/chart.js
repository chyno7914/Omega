const { result } = require("@hapi/joi/lib/base");
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
exports.broadSearch = (req, res, next) => {
  const sql = `SELECT SUM(use_bed) inuse,SUM(tol_bed) total FROM omega_room`;
  db.query(sql, (err, results) => {
    if (err) next(err);
    return res.cc(results);
  });
};
exports.majorRoll = (req, res, next) => {
  const sql = `SELECT t1.name,t2.value,t1.color 
FROM (
	SELECT 1 gender,'男' AS 'name','skyblue' color
	UNION
	SELECT 0 gender,'女' AS 'name','pink' color
)t1 RIGHT JOIN (
	SELECT t1.gender ,COUNT(*) 'value'
	FROM omega_students t1
	GROUP BY t1.gender 
)t2 ON t1.gender = t2.gender`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    const genderList = results;
    const sql = `SELECT major name,COUNT(*) value
          FROM omega_students
          GROUP BY major`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      res.cc({ genderList, majorList: results });
    });
  });
};

exports.map = (req, res, next) => {
  const sql = `SELECT short 'name',VALUE 'value',longitude,latitude
              FROM omega_map t1
              RIGHT JOIN (
                SELECT census,COUNT(*) VALUE
                FROM omega_students
                GROUP BY census
              )t2 ON t2.census = t1.official`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    const data = results.map(({ name, value, longitude, latitude }) => ({
      name,
      value: [longitude, latitude, value],
    }));
    res.cc(data);
  });
};
exports.list = (req, res, next) => {
  const sql = `SELECT t2.*,icon,color
              FROM (
                SELECT 'Male' icon,1 gender,'skyblue' color
                UNION
                SELECT 'Female' icon,0 gender,'pink' color
              )t1 LEFT JOIN (
                SELECT sid,sname,gender,census 
                FROM omega_students
              )t2 ON t1.gender = t2.gender
              where sid`;
  db.query(sql, (err, results) => {
    if (err) next(err);
    res.cc(results);
  });
};
