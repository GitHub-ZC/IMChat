const { Sequelize } = require('sequelize');
const config = require('../mysql-config');


/**
 * sequelize 文档链接 https://demopark.github.io/sequelize-docs-Zh-CN/
 * 连接到数据库,必须创建一个 Sequelize 实例
 */
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});


module.exports = sequelize;