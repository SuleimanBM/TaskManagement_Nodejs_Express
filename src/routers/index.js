import {Router} from "express"
import taskRouter from "./taskRouter.js"
import authRouter from "./authRouter.js"
import authMiddleware from "../middlewares/token.js"
import { filters } from "../middlewares/filters.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/todo", authMiddleware, filters ,taskRouter)

export default router