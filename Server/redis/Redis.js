class Redis {
    static redis = new Redis({
        host: "iecoxe.top",
        port: 6379,
        password: "",
        db: 3
    });
}



module.exports = Redis.redis;