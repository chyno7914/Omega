const Sequelize = require('sequelize');
const sequelize = new sequelize('数据库名', '账号', '密码', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
})