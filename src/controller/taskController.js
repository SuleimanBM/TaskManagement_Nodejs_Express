import * as taskServices from "../services/taskServices.js"

export const createTask = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { title, description, dueDate, priority, status } = req.body;
        const task = { title, description, dueDate, priority, status, userId };
        const createdTask = await taskServices.createTask(task);
        return res.status(201).json({ success: true, message: "Task created successfully", createdTask });
    } catch (error) {
        next(error);
    }
};
export const fetchAllTasks = async (req, res, next) => {
    try {
        const userId = req.userId
        const filters = req.filters
        console.log("userId from token", userId);
        const tasks = await taskServices.fetchAllTasks(userId, filters)
        return res.status(200).json({ sucesss: true, message: "Tasks fetched successfully", tasks})

    }catch(error){
        next(error)
    }
 }

export const fetchOneTask = async (req, res, next) => {
    try{
        const taskId = req.params.taskId
        const task = await taskServices.fetchTaskById(taskId)
        return res.status(200).json({ success: true, message: "Task fetched successfully", task})

    }catch(error){
        next(error)
    }
}

export const updateTask = async (req, res, next) => { 
    try{
        const taskId = req.params.taskId
        const task = req.body
        const updatedTask = await taskServices.findTaskAndUpdate(taskId, task)
        return res.status(200).json({ success: true, message: "Task updated successfully", updatedTask})
    }
    catch(error){
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try{
        const taskId = req.params.taskId
        const deleteTask = await taskServices.findTaskAndDelete(taskId)
        return res.status(200).json({success: true,message: "Task deleted successfully", deleteTask})
    }catch(error){
        next(error)
    }
}