const express = require("express");
const router = express.Router();
const db = require("../db/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { string, array, number, object } = require("joi");
const { result } = require("@hapi/joi/lib/base");
const { type } = require("@hapi/joi/lib/extend");
const { template } = require("@hapi/joi/lib/errors");
// express router.post("/token", (req, res, next) => {
//   res.cc("校验成功", 0);
// });
const isNihility = (value = null) => {
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
const setNull = (value) => {
  if (value === "") return null;
  return value;
};
function locateSequenceQuery(n) {
  let query = "SELECT 1 AS num";
  for (let i = 2; i <= n; i++) {
    query += ` UNION ALL SELECT ${i}`;
  }
  return query;
}
exports.chum = (req, res, next) => {
  //  "SELECT * FROM omega_route WHERE role IN (SELECT role FROM omega_users WHERE username = ?) or role is null Order By level";
  const userinfo = req.query;
  userinfo.currentPage = userinfo.currentPage ?? 1;
  userinfo.pageSize = userinfo.pageSize ?? 0;
  userinfo.major = userinfo.major ? eval(userinfo.major) : undefined;
  userinfo.grade = userinfo.grade ? eval(userinfo.grade) : undefined;
  userinfo.class = userinfo.class ? eval(userinfo.class) : undefined;
  const sql = `SELECT uid,sid,sname,t1.rid rid,bid,major,grade,class,tname,decipher,tag_type 'type',t1.status
                FROM omega_students t1
                LEFT JOIN omega_room t2 ON t1.rid = t2.rid and t1.tid = t2.tid
                LEFT JOIN omega_tower t3 ON t2.tid = t3.tid
                LEFT JOIN omega_status t4 ON t4.status = t1.status
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
              ${userinfo.ruinFlag == "true" ? "" : "and t1.status != '204'"}
                order by t2.tid,rid,bid ${eval(userinfo.flag) ? "desc" : "asc"}
                ${
                  userinfo.pageSize
                    ? "limit " +
                      userinfo.pageSize +
                      " offset " +
                      (userinfo.currentPage - 1) * userinfo.pageSize
                    : ""
                }`;
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
  const sql = `select tname from omega_tower where tid>0`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    const tnameList = results.map((item) => item.tname);
    res.cc(tnameList, 0);
  });
};
exports.room = (req, res, next) => {
  const userinfo = req.query;
  const sql = `SELECT distinct rid,tol_bed,use_bed,tname,decipher,tag_type 'type',t1.tid 
                FROM omega_room t1
                LEFT JOIN omega_tower t2 ON t1.tid = t2.tid 
                LEFT JOIN omega_status t3 ON t1.status = t3.status
                LEFT JOIN omega_floor t4 ON t1.floor = t4.floor
                WHERE number <= max_room
                ${
                  isNihility(userinfo.rid)
                    ? ""
                    : "and rid like " + toPartial(userinfo.rid)
                }
                ${
                  isNihility(userinfo.flat)
                    ? ""
                    : "and tname = " + toCommon(userinfo.flat)
                }
                ${
                  isNihility(userinfo.floor)
                    ? ""
                    : "and t1.floor like " + toPartial(userinfo.floor)
                }
                ${userinfo.banFlag == "true" ? "" : "and t1.status != '304'"}
                ${
                  userinfo.pageSize
                    ? "limit " +
                      userinfo.pageSize +
                      " offset " +
                      (userinfo.currentPage - 1) * userinfo.pageSize
                    : ""
                }`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.cc(results, 0);
  });
};
exports.chumDelete = (req, res, next) => {
  const target = req.body.sid;
  const sql = `delete from omega_students where sid = '${target}'`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc("删除成功", 0);
  });
};
exports.getFloorCount = (req, res, next) => {
  const prospect = req.query.flat;
  const sql = `select ceiling from omega_tower where tname = '${prospect}'`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.cc("请检查查询数据是否有效");
    res.send({
      status: 0,
      ceiling: results[0].ceiling,
    });
  });
};
exports.addRoom = (req, res, next) => {
  const { flat, tally: ideal, tol_bed } = req.body;
  let { transmitFlag: transmitDocker, floor: targetFloor } = req.body;
  let transmitFlag = transmitDocker == "true" ? true : false;
  const sql = `SELECT t7.tid,t5.floor,max_room, IFNULL(number, 0) AS number
              FROM omega_floor t5
              LEFT JOIN (
              SELECT 
		  t1.floor,
		  MAX(t1.number) AS number
		FROM 
		  omega_room t1
		  INNER JOIN omega_tower t2 
		    ON t1.tid = t2.tid
		WHERE 
		  t2.tname = '${flat}'
		GROUP BY 
		  t1.floor
             )t6 ON t5.floor = t6.floor
              LEFT JOIN omega_tower t7 ON t5.tid = t7.tid
              WHERE t7.status!= 504
              AND t5.status != 404
              AND t7.tname = "${flat}"
              ORDER BY FLOOR`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (results.length == 0) return res.cc("该公寓暂未开放，请联系管理员");
    let template = results;
    let coding = [];
    let brimFlag = false;
    if (isNihility(targetFloor)) {
      transmitFlag = true;
      targetFloor = 1;
    }
    if (transmitFlag) {
      template = template
        .slice(targetFloor - 1)
        .concat(template.slice(0, targetFloor - 1))
        .filter((item) => item.max_room > item.number);
      let actual = 0;
      for (let i = 0; i < template.length; i++) {
        if (actual == ideal) break;
        let targetObj = template[i];
        let vivosphere = targetObj.max_room - targetObj.number;
        let executioner =
          vivosphere > ideal - actual ? ideal - actual : vivosphere;
        coding = coding.concat(
          Array.from({ length: executioner }, (_, i) => [
            targetObj.floor * 100 + targetObj.number + i + 1,
            targetObj.floor,
            i + targetObj.number + 1,
            tol_bed,
            targetObj.tid,
          ])
        );
        actual += executioner;
      }
      brimFlag = ideal > actual;
      if (!coding.length) return res.cc("无剩余空间，请联系管理员");
      console.log(coding);
      const sql =
        "INSERT INTO omega_room (rid, floor, number,tol_bed,tid) VALUES ?";
      db.query(sql, [coding], (err, results) => {
        if (err) return next(err);
        res.cc(`${actual}条插入成功，${ideal - actual}条插入溢出`, brimFlag);
      });
    } else {
      const targetObj = template.find((obj) => obj.floor == targetFloor);
      let actual =
        ideal * 1 + targetObj.number > targetObj.max_room
          ? targetObj.max_room - targetObj.number
          : ideal * 1;
      brimFlag = ideal > actual;
      coding = Array.from({ length: actual }, (_, i) => [
        targetObj.floor * 100 + targetObj.number + i + 1,
        targetObj.floor,
        i + targetObj.number + 1,
        tol_bed,
        targetObj.tid,
      ]);
      if (!coding.length) return res.cc("无剩余空间，请联系管理员");
      console.log(coding);
      const sql =
        "INSERT INTO omega_room (rid, floor, number,tol_bed,tid) VALUES ?";
      db.query(sql, [coding], (err, results) => {
        if (err) return next(err);
        res.cc(`${actual}条插入成功，${ideal - actual}条插入溢出`, brimFlag);
      });
    }
  });
};
exports.adminFloorSearch = (req, res, next) => {
  const { targetFlat } = req.query;
  const sql = `SELECT t1.floor,max_room,IFNULL(use_room,0) use_room,decipher,tag_type 
FROM omega_floor t1
LEFT JOIN (
 SELECT FLOOR,COUNT(*) use_room 
 FROM omega_room 
 WHERE STATUS IN (300,301,302) 
 AND number <= (
   SELECT max_room 
   FROM omega_floor
   LEFT JOIN omega_tower ON omega_floor.tid = omega_tower.tid 
   WHERE omega_floor.floor = omega_room.floor
   AND tname = "${targetFlat}"
 )
 GROUP BY FLOOR
) t2 ON t1.floor = t2.floor
LEFT JOIN omega_tower t3 ON t1.tid = t3.tid
LEFT JOIN omega_status t4 ON t1.status = t4.status
WHERE tname = "${targetFlat}"`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.cc(results, 0);
  });
};
exports.banRoom = (req, res, next) => {
  const { target, flat } = req.body;
  const sql = `select use_bed,t1.status from omega_room t1 left join omega_tower t2 on t1.tid = t2.tid where rid = ${target} and tname = "${flat}"`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (result[0].use_bed) return res.cc("房间还有剩余住户，请清空房间后禁用");
    if (result[0].status == 304) return res.cc("房间已禁用");
    const sql = `update omega_room set status = 304 where rid = ${target} and tid = (
      select tid from omega_tower where tname = "${flat}"
    )`;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      res.cc("禁用成功", 0);
    });
  });
};
exports.useRoom = (req, res, next) => {
  const { rid, flat } = req.body;
  const sql = `select use_bed,tol_bed,status from omega_room where rid = ${rid} and tid = (
    select tid from omega_tower where tname = "${flat}"
  )`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) return next(err);
    console.log(result[0]);
    if (result[0].status != 304) return res.cc("房间已激活");
    let status = 300;
    if (result[0].use_bed == 0) {
      status = 301;
    } else if ((result[0].use_bed = result[0].tol_bed)) {
      status = 302;
    }
    const sql = `update omega_room set status = ${status} where rid = ${rid} and tid = (
                  select tid from omega_tower where tname = "${flat}"
                )`;
    console.log(sql);
    db.query(sql, (err, result) => {
      if (err) return next(err);
      res.cc("激活成功", 0);
    });
  });
};
exports.pushFloor = (req, res, next) => {
  const { flat, width } = req.body;
  const sql = `select tid,ceiling from omega_tower where tname = "${flat}"`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (results.length == 0) return res.cc("查无宿舍");
    const { tid, ceiling } = results[0];
    const awaitAddFloor = ceiling + 1;
    const sql = `update omega_tower set ceiling = ${awaitAddFloor} where tid = ${tid}`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      const sql = `insert into omega_floor set ?`;
      db.query(
        sql,
        { tid, floor: awaitAddFloor, max_room: width },
        (err, results) => {
          if (err) return next(err);
          res.cc("插入成功", 0);
        }
      );
    });
  });
};
exports.banFloor = (req, res, next) => {
  const { flat, floor: target } = req.body;
  const sql = `SELECT * FROM omega_students t1
              LEFT JOIN omega_room t2 ON t1.rid = t2.rid and t1.tid = t2.tid
              LEFT JOIN omega_tower t3 ON t3.tid = t2.tid
              WHERE t2.floor = ${target}
              AND tname = '${flat}'
              AND t1.status != 204`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (results.length) return res.cc("该楼层有剩余用户，无法禁用");
    const sql = `update omega_floor set status = 404 
                  where floor =  '${target}' 
                  and tid = (
                    select tid from omega_tower
                    where tname = '${flat}'
                  )`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      res.cc("修改成功", 0);
    });
  });
};
exports.extendFloor = (req, res, next) => {
  const { flat, floor: target } = req.body;
  const sql = `SELECT max_room,omega_floor.status FROM omega_floor
              LEFT JOIN omega_tower ON omega_floor.tid = omega_tower.tid 
              WHERE tname = "${flat}"
              AND FLOOR = ${target}`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (!results.length) return res.cc("请确认目标信息");
    if (results[0].status == 404) return res.cc("不能对禁用对象进行操作");
    if (results[0].max_room > 98) return res.cc("容量过大，再添加就不礼貌了");
    const sql = `UPDATE omega_floor
                LEFT JOIN omega_tower ON omega_floor.tid = omega_tower.tid
                SET max_room = max_room + 1
                WHERE tname = "${flat}"
                AND FLOOR = ${target}`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      res.cc("扩展完成", 0);
    });
  });
};
exports.reduceFloor = (req, res, next) => {
  const { flat, floor, target } = req.body;
  const sql = `SELECT max_room , t1.status, t5.rid
              FROM omega_floor t1
              LEFT JOIN omega_tower t2 ON t1.tid = t2.tid 
              LEFT JOIN (
                SELECT rid,t3.tid,FLOOR FROM omega_room t3
                LEFT JOIN omega_tower t4 ON t3.tid = t4.tid 
                WHERE number = ${target}
                AND use_bed > 0
              ) t5 ON t5.floor = t1.floor AND t5.tid = t1.tid 
              WHERE t2.tname = "${flat}"
              AND t1.floor = "${floor}"`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (!results.length) return res.cc("请确认目标信息");
    if (results[0].status == 404) return res.cc("不能对禁用对象进行操作");
    if (results[0].rid) return res.cc("查询到剩余用户，无法进行缩减");
    if (results[0].max_room < 1) return res.cc("没有了，求求你别删了");
    const sql = `UPDATE omega_floor
                LEFT JOIN omega_tower ON omega_floor.tid = omega_tower.tid
                SET max_room = max_room - 1
                WHERE tname = "${flat}"
                AND FLOOR = ${floor}`;
    db.query(sql, (err, results) => {
      if (err) return next(err);
      res.cc("缩减完成", 0);
    });
  });
};
exports.useFloor = (req, res, next) => {
  const { flat, floor: target } = req.body;
  const sql = `SELECT t1.status FROM omega_floor t1
              LEFT JOIN omega_tower t2 ON t2.tid = t1.tid
              WHERE t1.floor = ${target}
              AND tname = '${flat}'`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (result[0].status != 404) return res.cc("楼层已激活");
    let status = 400;
    const sql = `update omega_floor set status = ${status} 
                  where floor = ${target} and tid = (
                    select tid from omega_tower
                    where tid = (
                    select tid from omega_tower
                    where tname = '${flat}'
                  ))`;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      res.cc("激活成功", 0);
    });
  });
};
exports.editRoom = (req, res, next) => {
  const { tid, rid, tolBed } = req.body;
  const sql = `UPDATE omega_room 
               SET tol_bed = ${tolBed}
               WHERE tid = ${tid} AND rid = ${rid};`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (!results.affectedRows) return res.cc("好好检查输入吧");
    res.cc("修改成功", 0);
  });
};
exports.flat = (req, res, next) => {
  const userinfo = req.query;
  const sql = `SELECT DISTINCT t1.*,  IFNULL(tolly, 0) tolly, IFNULL(inuse, 0) inuse,t3.*
                FROM omega_tower t1
                LEFT JOIN (
                    SELECT tid, SUM(tol_bed) tolly, SUM(use_bed) inuse
                    FROM omega_room
                    GROUP BY tid
                ) t2 ON t1.tid = t2.tid
                LEFT JOIN omega_status t3 ON t1.status = t3.status
                WHERE t1.tid
                ORDER BY t1.tid = "${userinfo.tid}" desc, tname = "${userinfo.flat}" desc,
                t1.tid like "%${userinfo.tid}%" desc, tname like "%${userinfo.flat}%" desc,
                tid desc
                `;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.cc(results, 0);
  });
};
exports.addFlat = (req, res, next) => {
  const userinfo = req.body;
  const sql = `select * from omega_tower where tname = "${userinfo.tname}"`;
  db.query(sql, (err, results) => {
    if (err) return next(err);
    if (results.length) return res.cc("寝室名已被注册");
    const sql = `insert into omega_tower set ?`;
    db.query(
      sql,
      {
        tname: userinfo.tname,
        tgender: setNull(userinfo.tgender),
        ceiling: userinfo.ceiling,
        tcode: userinfo.tcode,
      },
      (err, results) => {
        if (err) return next(err);
        res.cc("添加成功", 0);
      }
    );
  });
};
exports.chumLeave = (req, res, next) => {
  const { target } = req.body;
  const sql = `update omega_apply set status = "save" where sid = ${target} and status = "checking" and type = "leave"`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    const sql = `update omega_students set status = 201 where sid = ${target}`;
    db.query(sql, (err, result) => {
      if (err) next(err);
      if (!result.changedRows) return next("数据异常");
      res.cc("修改成功", 0);
    });
  });
};
exports.chumBack = (req, res, next) => {
  const { target } = req.body;
  const sql = `update omega_apply set status = "backed" where sid = ${target} and status = "backing" and type = "leave"`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    const sql = `update omega_students set status = 200 where sid = ${target}`;
    console.log(sql);
    db.query(sql, (err, result) => {
      if (err) return next(err);
      if (!result.changedRows) return next("数据异常");
      res.cc("修改成功", 0);
    });
  });
};
exports.roomGather = (req, res, next) => {
  const { flat, floor } = req.query;
  const sql = `select rid from omega_room t1
              left join omega_tower t2 on t1.tid = t2.tid 
              where tname = "${flat}"
              and floor = ${floor}`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc(result, 0);
  });
};
exports.bedGather = (req, res, next) => {
  const { flat, rid } = req.query;
  const sql = `WITH RECURSIVE seq(id) AS (
              SELECT 0
              UNION ALL
              SELECT id + 1 FROM seq 
              WHERE id < (
                SELECT IFNULL(tol_bed,0) 
                FROM omega_room t1 
                LEFT JOIN omega_tower t2 ON t1.tid = t2.tid 
                WHERE tname = '${flat}' AND rid = ${rid}
              )
            )
            SELECT t1.id bid,t2.sid
            FROM seq t1
            LEFT JOIN (
              SELECT omega_students.*
              FROM omega_students 
              LEFT JOIN omega_tower ON omega_students.tid = omega_tower.tid
              WHERE omega_tower.tname =  '${flat}' AND rid = ${rid}
            ) t2 ON t1.id = t2.bid
            WHERE id != 0;`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc(result, 0);
  });
};
exports.orderChange = (req, res, next) => {
  const { sid, flat, rid, bid } = req.body;
  const omega = { flat, rid, bid };
  const sql = `SELECT sid,bid,t1.rid,t2.tid,t2.tname,t3.tol_bed,t3.use_bed FROM omega_students t1 
              LEFT JOIN omega_tower t2 ON t1.tid = t2.tid 
              LEFT JOIN omega_room t3 ON t1.rid = t3.rid AND t1.tid = t3.tid
              WHERE sid = ${sid} AND t1.status != 204`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    if (!result.length) return next("用户丢失");
    const alpha = {
      tid: result[0].tid,
      rid: result[0].rid,
      bid: result[0].bid,
      sid: result[0].sid,
      flat: result[0].tname,
      tolBed: result[0].tol_bed,
      useBed: result[0].use_bed,
    };
    const sql = `SELECT sid,use_bed,tol_bed,t1.tid FROM omega_room t1
              LEFT JOIN omega_tower t2 ON t1.tid = t2.tid
              LEFT JOIN (
                SELECT * FROM omega_students
                WHERE bid =${bid}
                AND status != 204
              ) t3 ON t1.tid = t3.tid AND t1.rid = t3.rid
              WHERE tname = "${flat}" 
              AND t1.rid = ${rid}
              AND ${bid} <= tol_bed
              AND t1.status != 304
              `;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      if (!result.length) return next("目标丢失");
      if (result[0].sid == sid) return next("请不要自己换自己来愚弄我");
      omega.useBed = result[0].use_bed;
      omega.tolBed = result[0].tol_bed;
      omega.tid = result[0].tid;
      const target = result[0].sid;
      if (result[0].sid) {
        const sql = `UPDATE omega_students
                  SET tid = CASE sid
                            WHEN ${target} THEN "${alpha.tid}"
                            WHEN ${sid} THEN "${omega.tid}"
                            ELSE tid
                          END,
                      rid = CASE sid
                            WHEN ${target} THEN "${alpha.rid}"
                            WHEN ${sid} THEN "${omega.rid}"
                            ELSE rid
                          END,
                      bid = CASE sid
                            WHEN ${target} THEN "${alpha.bid}"
                            WHEN ${sid} THEN "${omega.bid}"
                            ELSE bid
                          END
                  WHERE sid IN (${sid}, ${target});`;
        db.query(sql, (err, result) => {
          if (err) return next(err);
          res.cc("交换成功", 0);
        });
      } else {
        const sql = `UPDATE omega_students
                    SET tid = ${omega.tid}, rid = ${rid}, bid = ${bid}
                    WHERE sid = ${sid};`;
        db.query(sql, (err, result) => {
          if (err) return next(err);
          if (alpha.tid == omega.tid && alpha.rid == omega.rid)
            return res.cc("交换成功", 0);
          let status = 300;
          alpha.useBed--;
          if (!alpha.useBed) status = 301;
          const sql = `update omega_room set status = ${status},use_bed = use_bed-1 where rid = ${alpha.rid} and tid = ${alpha.tid}`;
          db.query(sql, (err, result) => {
            if (err) return next(err);
            if (!result.changedRows) return next("无效修改");
            let status = 300;
            omega.useBed++;
            if (omega.useBed == omega.tolBed) status = 302;
            const sql = `update omega_room set status = ${status},use_bed = use_bed+1 where rid = ${omega.rid} and tid = ${omega.tid}`;
            db.query(sql, (err, result) => {
              if (err) return next(err);
              if (!result.changedRows) return next("无效修改");
              res.cc("交换成功", 0);
            });
          });
        });
      }
    });
  });
};
exports.chumRuin = (req, res, next) => {
  const { target } = req.body;
  const sql = `select uid from omega_students where sid = ${target}`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    const uid = result[0].uid;
    const sql = `update omega_students set status = "204" where sid = ${target}`;
    db.query(sql, (err, result) => {
      if (err) return next(err);
      if (!result.changedRows) return next("参数异常");
      const sql = `update omega_room t1 left join omega_students t2 on t1.rid = t2.rid and t1.tid = t2.tid set use_bed = use_bed-1 where sid = ${target}`;
      db.query(sql, (err, result) => {
        if (err) return next(err);
        if (!uid) return res.cc("操作成功", 0);
        const sql = `update omega_grant set role = 4 where uid = ${uid}`;
        db.query(sql, (err, result) => {
          if (err) return next(err);
          res.cc("操作成功", 0);
        });
      });
    });
  });
};
exports.orderUser = (req, res, next) => {
  const sql = `SELECT t1.uid,t2.call,username,user_pic,telephone 
                FROM omega_users t1
                LEFT JOIN (
                  SELECT r1.call,r2.uid
                  FROM omega_role r1
                  RIGHT JOIN omega_grant r2 ON r1.role = r2.role
                ) t2 ON t1.uid = t2.uid`;
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc(result, 0);
  });
};
exports.userDelete = (req, res, next) => {
  const { target } = req.body
  const sql = `delete from omega_users where uid = ${target}`
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.cc("删除成功",0)
  })
}
