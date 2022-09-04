const crypto = require('crypto');
const { customAlphabet } = require('nanoid');
const User = require('../models/User');


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
            var passWord = ctx.request.query.passWord || '';
            var nickName = ctx.request.query.nickName || '';
            var verificationCode = ctx.request.query.verificationCode || '';
        } else if (ctx.request.method === 'POST') {
            var telephone = ctx.request.body.telephone || '';
            var passWord = ctx.request.body.passWord || '';
            var nickName = ctx.request.body.nickName || '';
            var verificationCode = ctx.request.body.verificationCode || '';
        }

        const nanoid = customAlphabet('1234567890', 9);
        const loginId = `1 + ${nanoid()}`;
        const hmac = crypto.createHmac('sha256', loginId);

        hmac.update(passWord);

        let passWd_HMAC = hmac.digest('hex');

        let user = User.build({
            U_LoginID: loginId,
            U_Telephone: telephone,
            U_NickName: nickName,
            U_PassWord: passWd_HMAC
        });

        ctx.rest(user.toJson());
    }
}


module.exports = {
    Register
}