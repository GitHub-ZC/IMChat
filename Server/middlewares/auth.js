const redis = require("../redis/Redis");

RequireTokenModules = [
    // "login",
]

module.exports = {
    /**
     * aop 根据设定 验证token
     * @param {*} pathPrefix 需要验证token的path前缀
     * @returns 
     */
    validation: () => {
        let requireTokenModules = new Set(RequireTokenModules);
        return async (ctx, next) => {
            let a = ctx.request.path.split("/").filter(n => n !== '').pop();
            if (requireTokenModules.has(a)) {
                let token = ctx.request.headers['x-tk'];

                // koken 不存在 直接返回
                if (!token) {
                    ctx.rest({
                        code: 4100,
                        message: "token is not found"
                    })
                    return;
                }

                redis.get("")
            } else {
                await next();
            }
        };
    }
};