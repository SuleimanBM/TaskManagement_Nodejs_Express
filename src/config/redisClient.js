import Redis from "ioredis";
// Connect to Redis running in WSL
const redis = new Redis({
    host: "localhost", // or "127.0.0.1"
    port: 6379
});

redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;