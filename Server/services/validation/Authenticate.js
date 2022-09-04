const User = require('../../models/User');


class Authenticate {
    #validUsers = new Map();

    constructor() {
        this.#validUsers.set('2018110753', '123456...');
        this.#validUsers.set('2018110754', '123456...');
        this.#validUsers.set('2018110755', '123456...');
        this.#validUsers.set('2018110756', '123456...');
        this.#validUsers.set('2018110757', '123456...');
    }


    checkUser(obj) {
        if (!obj) {
            return;
        }

        // 解析数据逻辑部分
        let m = obj;
        if (typeof obj === 'string') {
            m = JSON.parse(obj);
        }


        // 数据读取数据部分
        let p = this.#validUsers.get(m.userId);
        if (!p) {
            return false;
        }


        // 身份信息进行验证
        if (m.passWd == p) {
            return true;
        }

        return false;
    }
}

const authenticate = new Authenticate();

module.exports = authenticate;