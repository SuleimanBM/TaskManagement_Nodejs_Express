import {Router} from "express"
import * as authController from "../controller/authController.js"
import { validateUser } from "../middlewares/validation.js"
import { limiter } from "../utils/rateLimitUtil.js"


const router = Router()

router.post("/register", limiter, validateUser, authController.registerUser)
router.post("/login", limiter, validateUser, authController.loginUser)
router.post("/forgot-password", authController.forgotPassword)
router.post("/refresh", authController.refreshToken)


export default router