import {Router} from "express"
//import * as taskController from "../controllers/taskController.js"
import * as taskController from "../controller/taskController.js"
const router = Router()


router.post("tasks",taskController.createTask)
router.get("/tasks", taskController.fetchAllTasks);
router.get("/tasks/:id",taskController.fetchOneTask)
router.patch("/tasks/:id",taskController.updateTask)
router.delete("/tasks/:id",taskController.deleteTask)


export default router