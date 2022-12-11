const User = require('../../models/User');
const redis = require('../../redis/Redis');



/**
 * websocket的登录验证
 */
class Authenticate {
    static async checkUser(obj) {
        if (!obj) {
            return;
        }

        // 解析数据逻辑部分
        let m = obj;
        if (typeof obj === 'string') {
            m = JSON.parse(obj);
        }


        let token = m.token;
        let id = token.split('313i&m&1203').pop();

        let redis_token = await redis.get("imchat_" + id);

        // token相等 验证成功
        if(redis_token === token) {
            return true;
        }

        return false;
    }
}

// const authenticate = new Authenticate();

module.exports = Authenticate;