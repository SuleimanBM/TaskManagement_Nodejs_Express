import * as taskServices from "../services/taskServices.js"
import { getCachedData, cacheData } from "../utils/redisUtils.js";
export const createTask = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { title, description, dueDate, priority, status,time, category,subtasks,isCompleted } = req.body;
        const task = { title, description, dueDate, priority, status, userId, time, category, subtasks, isCompleted };
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
        const fromCache = await getCachedData(userId)
        if(fromCache){
            return res.status(200).json({ success: true, message: "Tasks fetched successfully from cach", tasks: fromCache})
        }
        const tasks = await taskServices.fetchAllTasks(userId, filters)
        await cacheData(userId, tasks)
        return res.status(200).json({ sucesss: true, message: "Tasks fetched successfully", tasks})

    }catch(error){
        next(error)
    }
 }

export const fetchOneTask = async (req, res, next) => {
    try{
        const taskId = req.params.taskId
        const fromCache = await getCachedData(taskId)
        if (fromCache) {
            return res.status(200).json({ success: true, message: "Tasks fetched successfully from cach", tasks: fromCache })
        }
        const task = await taskServices.fetchTaskById(taskId)
        await cacheData(taskId, task)

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

export const getTaskStatistics = async (req, res, next) => {
    try {
        const userId = req.userId;
        const tasks = await taskServices.fetchAllTasks(userId);
        const taskStats = {
            completed: tasks.filter(task => task.status === 'Completed').length,
            pending: tasks.filter(task => task.status !== 'Completed' && new Date(task.dueDate) >= new Date()).length,
            overdue: tasks.filter(task => task.status !== 'Completed' && new Date(task.dueDate) < new Date()).length
        };
        return res.status(200).json({ success: true, message: "Task statistics fetched successfully", taskStats });
    }
    catch(error){
        next(error)
    }
}