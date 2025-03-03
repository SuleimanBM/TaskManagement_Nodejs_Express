import {Router} from "express"
import taskRouter from "./taskRouter.js"
import authRouter from "./userRouter.js"
import authMiddleware from "../middlewares/token.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/todo", authMiddleware ,taskRouter)

export default router