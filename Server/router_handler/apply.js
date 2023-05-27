const { result } = require("@hapi/joi/lib/base");
const mysql = require("mysql");
const db = require("../db/init");
const iconv = require("iconv-lite");
function removeQuotes(str) {
  // 使用正则表达式去除收尾的单引号
  str = str ? str.replace(/^'(.*)'$/, "$1") : "";

  return str;
}
exports.submitPush = (req, res, next) => {
  const { status, ...userinfo } = req.body;
  const sql = `select * from omega_apply where applId = ${
    userinfo.applId ? userinfo.applId : "NULL"
  }`;
  const speech = (() => {
    if (status == "checking") return "提交";
    else return "保存";
  })();
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (result.length == 1) {
      const sql = `update omega_apply set ? where applId = ?`;
      db.query(
        sql,
        [
          {
            uid: userinfo.uid,
            sid: userinfo.sid,
            telephone: userinfo.telephone,
            timestamp: userinfo.time,
            straight: userinfo.valueHtml,
            meta: userinfo.meta,
            type: userinfo.type,
            status: status ? status : "save",
          },
          userinfo.applId,
        ],
        (err, result) => {
          if (err) return next(err);
          res.cc(`${speech}成功`, 0);
        }
      );
    } else {
      const sql = `insert into omega_apply set ?`;
      db.query(
        sql,
        {
          uid: userinfo.uid,
          sid: userinfo.sid,
          telephone: userinfo.telephone,
          timestamp: userinfo.time,
          straight: userinfo.valueHtml,
          meta: userinfo.meta,
          type: userinfo.type,
          status: status ? status : "save",
        },
        (err, result) => {
          if (err) return next("数据异常，请检查输入是否合法");
          res.send({
            status: 0,
            message: `${speech}成功`,
            id: result.insertId,
          });
        }
      );
    }
  });
};
exports.submitSearchTokenCheck = (req, res, next) => {
  const { applId, uid } = req.query;
  const sql = `SELECT count(*) count FROM omega_apply 
                WHERE applId = '${applId}' AND uid = '${uid}' AND status = 'save'`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (!result[0].count) return next("暂无权限访问该请求");
    res.cc(result[0].count, 0);
  });
};

exports.submitSearch = (req, res, next) => {
  const { uid, tid, searchType, searchStatus } = req.query;
  const sql = `select role from omega_users where uid = ${uid} and role in (2,3)`;
  console.log(db.escape(searchStatus));
  db.query(sql, (err, result) => {
    if (err) return next(err);
    const flag = !!result.length;
    const sql = `SELECT applId,t1.uid,straight,t1.sid,telephone,t1.timestamp,meta,t2.*,t3.*,t4.*,t5.*
                FROM omega_apply t1
                LEFT JOIN omega_applistatus t2 ON t1.status = t2.status
                LEFT JOIN omega_applitype t3 ON t3.type = t1.type
                LEFT JOIN (
                  SELECT uid,username FROM omega_users
                )t4 ON t4.uid = t1.uid
                LEFT JOIN (
                  SELECT sid,sname,tname,rid,t6.tid
                  FROM omega_students t6
                  LEFT JOIN omega_tower t7 ON t6.tid = t7.tid 
                ) t5 ON t5.sid = t1.sid
                WHERE ${flag ? "t5.tid" : "t1.uid"} = ${flag ? tid : uid}
                  ${
                    searchStatus
                      ? `AND t1.status NOT IN (${db.escape(searchStatus)})`
                      : ""
                  }
                 ${
                   searchType
                     ? `AND t1.type NOT IN (${db.escape(searchType)})`
                     : ""
                 }
                order by timestamp desc
                `;

    db.query(sql, (err, result) => {
      if (err) return next(err);
      // result.straight = decodeURIComponent(removeQuotes(result.straight));
      res.cc(result, 0);
    });
  });
};
exports.submitContinue = (req, res, next) => {
  const { applId } = req.query;
  const sql = `SELECT * FROM omega_apply 
                WHERE applId = '${applId}'`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc(result, 0);
  });
};
exports.submitDelete = (req, res, next) => {
  const { applId } = req.body;
  const sql = `delete from omega_apply where applId = ${applId}`;
  db.query(sql, (err, result) => {
    if (err) next(err);
    res.cc("申请已删除", 0);
  });
};
exports.gatherItemAttribute = (req, res, next) => {
  const { uid } = req.query;
  const sql = `SELECT * FROM omega_applitype WHERE accessRight = (
                SELECT role 
                FROM omega_users
                WHERE uid = ${uid}
              ) OR accessRight IS NULL;`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    const type = result.map((item) => item.type);
    const sql = `SELECT * FROM omega_applistatus WHERE accessRight = (
                SELECT role 
                FROM omega_users
                WHERE uid = ${uid}
              ) OR accessRight IS NULL;`;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      const status = result.map((item) => item.status);
      res.cc({ type, status }, 0);
    });
  });
};
