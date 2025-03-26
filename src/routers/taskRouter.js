import {Router} from "express"
import * as taskController from "../controller/taskController.js"
import { validateTask } from "../middlewares/validation.js";

const router = Router()


/**
 * @swagger
 * /todo/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task.
 *     description: Create a new task with the provided details.
 *     consumes:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: task
 *         description: The task object to be created.
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *           properties:
 *             title:
 *               type: string
 *               example: "Buy groceries"
 *             description:
 *               type: string
 *               example: "Milk, Bread, Eggs"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/tasks", validateTask, taskController.createTask);

/**
 * @swagger
 * /todo/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retrieve all tasks.
 *     description: Fetch a list of all tasks.
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Task'
 */
router.get("/tasks", taskController.fetchAllTasks);

/**
 * @swagger
 * /todo/tasks/{taskId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retrieve a specific task.
 *     description: Fetch a task by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *         description: The ID of the task.
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *         schema:
 *           $ref: '#/definitions/Task'
 *       404:
 *         description: Task not found.
 */
router.get("/tasks/:taskId", taskController.fetchOneTask);

/**
 * @swagger
 * /todo/tasks/{taskId}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update a task.
 *     description: Update details for an existing task.
 *     consumes:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *         description: The ID of the task to update.
 *       - in: body
 *         name: task
 *         description: The task object with updated fields.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Updated task title"
 *             description:
 *               type: string
 *               example: "Updated description"
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Task not found.
 */
router.patch("/tasks/:taskId", taskController.updateTask);

/**
 * @swagger
 * /todo/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task.
 *     description: Delete a task by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *         description: The ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 */
router.delete("/tasks/:taskId", taskController.deleteTask);

/**
 * @swagger
 * definitions:
 *   Task:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "12345"
 *       title:
 *         type: string
 *         example: "Buy groceries"
 *       description:
 *         type: string
 *         example: "Milk, Bread, Eggs"
 *       status:
 *         type: string
 *         example: "pending"
 */


export default router