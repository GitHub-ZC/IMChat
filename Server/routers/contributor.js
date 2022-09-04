const Router = require('koa-router');
const { index } = require('./index');
const { Register } = require('./Register');




const v1 = new Router({prefix: '/v1'});

v1.get('/index', index);

v1.get('/register', Register.register);



module.exports = v1;