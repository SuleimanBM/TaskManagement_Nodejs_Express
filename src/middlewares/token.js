import jsonwebtoken from "jsonwebtoken"
import createHttpError from "http-errors";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new createHttpError.Unauthorized("Access denied. No token provided.")
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            throw new createHttpError.Forbidden("Token invalid or expired")
        }

        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

export default authMiddleware;