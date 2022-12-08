const Router = require('koa-router');
const { index } = require('./index');
const { Register } = require('./Register');
const { Login } = require('./Login');



// 初始化路由 v1
const v1 = new Router({prefix: '/v1'});

/**
 * 注册路由
 */
v1.get('/index', index);

v1.get('/register', Register.register);
v1.get('/login', Login.login);



module.exports = v1;