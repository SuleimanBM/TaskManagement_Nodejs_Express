import createHttpError from "http-errors";
import taskModel from "../models/taskModels.js"


export const createTask = async (task) => {
    if (!task.userId) {
        throw createHttpError.BadRequest("UserId is required")
    }
    const createdTask = await taskModel.create(task)
    if (!createdTask) {
        throw createHttpError.InternalServerError("Task creation failed")
    }
    createdTask.save()
    return createdTask
}

export const fetchAllTasks = async(userId, filters) => {
    if(!userId) {
        throw createHttpError.BadRequest("UserId is required")
    }
    const {sort,...newFilters} = filters
    const query  = {userId, ...newFilters}

    const tasks = await taskModel.find(query).sort(sort)

    if(!tasks) {
        throw createHttpError.NotFound("No tasks found")
    }
    return tasks
};

export const fetchTaskById = async (taskId) => {
    if(!taskId) {
        throw createHttpError.BadRequest("TaskId is required")
    }

    const task = await taskModel.findById(taskId)

    if(!task) {
        throw createHttpError.NotFound("No such tasks found")
    }
    return task
}

export const findTaskAndUpdate = async (taskId, task) => {
    if(!taskId){
        throw createHttpError.BadRequest("TaskId is required")
    }
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, {$set: task}, {new: true, upsert: false})
    if(!updatedTask) {
        throw createHttpError.InternalServerError("An unexpected error occurred")
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