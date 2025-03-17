import redis from "../config/redisClient.js";
export const cacheData = async(key, value, expiry = 3600) =>{
    await redis.set(key, JSON.stringify(value), "EX", expiry);
}

export const getCachedData = async(key) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
}
