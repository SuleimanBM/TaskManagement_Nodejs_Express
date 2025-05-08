import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 7 * 24 * 60 * 60 * 1000,
    max: 5,
    message: "Too many to login attempts, Please try again after 7 days"
})
