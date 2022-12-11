const crypto = require('crypto');
const User = require('../models/User');
const { APIError } = require('../middlewares/rest');
const { ParametricTest } = require('../utils/ParametricTest');
const redis = require('../redis/Redis');


/**
 * 注册账号
 */
class Login {
    static async login(ctx) {
        /**
         * telephone 手机号
         * passWord 密码
         * nickName 昵称
         */
        if (ctx.request.method === 'GET') {
            var telephone = ctx.request.query.telephone || '';
            var password = ctx.request.query.password || '';
            var verificationCode = ctx.request.query.verificationCode || '';
        } else if (ctx.request.method === 'POST') {
            var telephone = ctx.request.body.telephone || '';
            var password = ctx.request.body.password || '';
            var verificationCode = ctx.request.body.verificationCode || '';
        }

        // 参数取值的检测
        ParametricTest('telephone', telephone);
        ParametricTest('password', password);

        // 根据手机号查询数据库 账号是否已经注册
        // ........
        const user_form_database = await User.findOne({ where: { U_Telephone: telephone } });
        if (user_form_database === null) {
            throw new APIError(4002, "账户不存在");
        }

        // 从数据库获取 Salt
        let U_Salt = user_form_database.U_Salt

        /* password sha256 加密 */
        const hmac = crypto.createHmac('sha256', U_Salt);
        hmac.update(password);
        // sha256
        let passWd_HMAC = hmac.digest('hex');

        // 数据库中密码和传入的密码进行比对
        if (passWd_HMAC === user_form_database.U_PassWord) {
            let id = await redis.get("imchat_" + user_form_database.U_ID);
            console.log(id);
            const hmac_token = crypto.createHmac('sha256', new Date().getTime().toString());
            hmac_token.update(password);

            // 生成token
            let token = hmac_token.digest('hex').toString() + '313i&m&1203' + user_form_database.U_ID;

            // 设置token的过期时间
            let b = await redis.set("imchat_" + user_form_database.U_ID, token, "EX", 60 * 60 * 24);

            if(b !== 'OK') {
                throw new APIError(4004, "登录错误");
            }


            ctx.rest({
                data: {
                    ...user_form_database.toJSON(),
                    token
                }
            });
        } else {
            throw new APIError(4003, "密码错误");
        }
    }
}


module.exports = {
    Login
}