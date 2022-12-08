const crypto = require('crypto');
const User = require('../models/User');
const { APIError } = require('../middlewares/rest');
const { ParametricTest } = require('../utils/ParametricTest');


/**
 * 注册账号
 */
class Register {
    static async register(ctx) {
        /**
         * telephone 手机号
         * passWord 密码
         * nickName 昵称
         */
        if (ctx.request.method === 'GET') {
            var telephone = ctx.request.query.telephone || '';
            var password = ctx.request.query.password || '';
            var nickname = ctx.request.query.nickname || '';
            var verificationCode = ctx.request.query.verificationCode || '';
        } else if (ctx.request.method === 'POST') {
            var telephone = ctx.request.body.telephone || '';
            var password = ctx.request.body.password || '';
            var nickname = ctx.request.body.nickname || '';
            var verificationCode = ctx.request.body.verificationCode || '';
        }

        // 参数取值的检测
        ParametricTest('telephone', telephone);
        ParametricTest('password', password);
        ParametricTest('nickname', nickname);

        // 根据手机号查询数据库 账号是否已经注册
        // ........
        const user_form_database = await User.findOne({ where: { U_Telephone: telephone } });
        if (user_form_database !== null) {
            throw new APIError(4001, "账户已存在");
        }

        // 生成 Salt
        const U_Salt = `${Math.floor((Math.random() * 10000000000))}`;

        /* password sha256 加密 */
        const hmac = crypto.createHmac('sha256', U_Salt);
        hmac.update(password);
        // sha256
        let passWd_HMAC = hmac.digest('hex');

        let user = User.build({
            U_Salt: U_Salt,
            U_Telephone: telephone,
            U_NickName: nickname,
            U_PassWord: passWd_HMAC,
            U_LoginID: "u_" + telephone,
            U_UserStateID: 0
        });

        let result = await user.save();
        console.log(result);

        ctx.rest(ctx.rest({
            code: 2000,
            msg: "恭喜你，注册成功"
        }));
    }
}


module.exports = {
    Register
}