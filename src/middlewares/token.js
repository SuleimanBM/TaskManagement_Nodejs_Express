import jsonwebtoken from "jsonwebtoken"
import createHttpError from "http-errors";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new createHttpError.Unauthorized("Access denied. No token provided.")
    }

    try {
        const decoded = jsonwebtoken.verify(token, "your-secret-key");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

export default authMiddleware;