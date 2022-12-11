const _Redis = require("ioredis");

class Redis {
    static redis = new _Redis({
        host: "iecoxe.top",
        port: 6379,
        password: "12345",
        db: 3
    });
}



module.exports = Redis.redis;