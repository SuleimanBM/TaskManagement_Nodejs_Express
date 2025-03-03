import {Router} from "express"
import * as taskController from "../controller/taskController.js"
import { validateTask } from "../middlewares/validation.js";

const router = Router()


router.post("/tasks", validateTask, taskController.createTask)
router.get("/tasks", taskController.fetchAllTasks);
router.get("/tasks/:taskId",taskController.fetchOneTask)
router.patch("/tasks/:taskId",taskController.updateTask)
router.delete("/tasks/:taskId",taskController.deleteTask)


export default router