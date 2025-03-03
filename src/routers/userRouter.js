import {Router} from "express"
import * as userController from "../controller/userController.js"
import { validateUser } from "../middlewares/validation.js"


const router = Router()

router.post("/register", validateUser, userController.registerUser)
router.post("/login", validateUser, userController.loginUser)

export default router