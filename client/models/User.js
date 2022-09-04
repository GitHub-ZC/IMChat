

/**
 * 用户身份验证
 */
class User {
    /**
     * 用户登录 —— 构造函数
     * @param {*} #userId 用户Id
     * @param {*} #passwd 用户密码
     */
    constructor(userId, passWd, nickName) {
        this.#userId = userId;
        this.#passWd = passWd;
        this.#nickName = nickName;
    }

    getNickName() {
        return this.#nickName;
    }

    getUserId() {
        return this.#userId;
    }
}

module.exports = User;