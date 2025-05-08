import Redis from "ioredis";
// Connect to Redis running locally
const redis = new Redis({
    host: "localhost",
    port: 6379
});

redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
