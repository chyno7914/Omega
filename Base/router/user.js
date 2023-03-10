const express = require('express')
const expressJoi = require('@escook/express-joi')
const userHandler = require('../router_handler/user')
const { reg_schema } = require('../schema/user')
const { login_schema } = require('../schema/user')
const router = express.Router()
router.post('/reguser', expressJoi(reg_schema), userHandler.reguser)
router.post('/login', expressJoi(login_schema), userHandler.login)
module.exports = router