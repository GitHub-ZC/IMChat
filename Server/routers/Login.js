const crypto = require('crypto');
const User = require('../models/User');
const { APIError } = require('../middlewares/rest');
const { ParametricTest } = require('../utils/ParametricTest');


/**
 * 注册账号
 */
class Login {
    static async register(ctx) {
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

        if (passWd_HMAC === user_form_database.passWd_HMAC) {
            ctx.rest({
                data: result
            });
        } else {
            throw new APIError(4003, "密码错误");
        }
    }
}


module.exports = {
    Login
}