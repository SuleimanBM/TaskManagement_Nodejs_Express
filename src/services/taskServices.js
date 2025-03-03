import createHttpError from "http-errors";
import taskModel from "../models/taskModels.js"


export const createTask = async (task) => {
    if (!task.userId) {
        throw new createHttpError.BadRequest("UserId is required")
    }
    const createdTask = await taskModel.create(task)
    if (!createdTask) {
        throw new createHttpError.InternalServerError("Task creation failed")
    }
    createdTask.save()
    return createdTask
}

export const fetchAllTasks = async (userId) => {
    if(!userId) {
        throw new createHttpError.BadRequest("UserId is required")
    }
    const tasks = await taskModel.find(userId)
    if(!tasks) {
        throw new createHttpError.NotFound("No tasks found")
    }
    return tasks
};

export const fetchTaskById = async (taskId) => {
    if(!taskId) {
        throw new createHttpError.BadRequest("TaskId is required")
    }
    const task = await taskModel.findById(taskId)
    if(!task) {
        throw new createHttpError.NotFound("No such tasks found")
    }
    return task
}

export const findTaskAndUpdate = async (taskId, task) => {
    if(!taskId){
        throw new createHttpError.BadRequest("TaskId is required")
    }
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, task, {new: true, upsert: true})
    if(!updatedTask) {
        throw new createHttpError.InternalServerError("An unexpected error occurred")
    }
    return updatedTask
}

export const findTaskAndDelete = async (taskId) => {
    if(!taskId){
        throw new createHttpError.BadRequest("TaskId is required")
    }
    const deletedTask = await taskModel.findByIdAndDelete(taskId)
    
    return deletedTask
}