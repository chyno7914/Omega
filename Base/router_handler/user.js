const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.reguser = (req, res, next) => {
    const userinfo = req.body 
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, [userinfo.username], (err,results) => {
        if (err) return next(err)
        if (results.length > 0) return next('用户名已存在')
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return next(err)
            res.cc('注册成功',0)
        })
    })
    // res.cc('sd')
}
exports.login = (req, res, next) => {
    const userinfo = req.body 
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, [userinfo.username], (err,results) => {
        if (err) return next(err)
        if (results.length == 0) return next('用户名不存在')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return next('密码错误')
        const user = { ...results[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn:'10h'
        })
        res.send({
            status: 0,
            message: '登录成功',
            token:'Bearer ' + tokenStr
        })
    })
}
exports.tryReguser = (req, res, next) => {
    const userinfo = req.body 
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, [userinfo.username], (err,results) => {
        if (err) return next(err)
        if (results.length > 0) return next('用户名已存在')
        res.cc('注册成功')
    })
    // res.cc('sd')
}
