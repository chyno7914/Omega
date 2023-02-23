const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        // console.log(err);
        return res.send({
            status,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})
app.use('/api', userRouter)
app.use((err, req, res, next) => {
    if (err.name == 'UnanchorizedError')return res.cc('身份验证错误')
    return res.cc(err)
})
app.listen(3007, () => {
    console.log('api BIGEVENT_SERVER running in 127.0.0.1:3007');
})