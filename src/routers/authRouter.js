import {Router} from "express"
import passport from "passport"
import * as authController from "../controller/authController.js"
import { validateUser } from "../middlewares/validation.js"
import { limiter } from "../utils/rateLimitUtil.js"
import OAuth from "../services/OAuth.js"

const router = Router()

router.get(
    '/google',
    passport.authenticate(
        'google',
        { scope: ['email', 'profile'] }
    )
);
router.get('/google/callback', passport.authenticate('google',{
    session: false, // Disable Passport.js sessions
    failureRedirect: '/login'
}), authController.googleAuth)

router.post("/register", limiter, validateUser, authController.registerUser)
router.post("/login", limiter, validateUser, authController.loginUser)
router.post("/forgot-password", authController.forgotPassword)
router.get("/reset-password", authController.getResetPasswordPage)
router.post("/reset-password", authController.resetPassword)
router.post("/refresh", authController.refreshToken)


export default router