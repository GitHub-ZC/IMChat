const Router = require('koa-router');
const { index } = require('./index');
const { Register } = require('./Register');



// 初始化路由 v1
const v1 = new Router({prefix: '/v1'});

/**
 * 注册路由
 */
v1.get('/index', index);

v1.get('/register', Register.register);



module.exports = v1;