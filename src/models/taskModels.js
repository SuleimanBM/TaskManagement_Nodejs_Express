import mongoose from "mongoose";
import db from "../config/db.js"


const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        default: "low",
        enum: ["Low", "Medium", "High",]
    },
    status: {
        type: String,
        enum: ["Pending", "InProgress", "Completed"]
    },
    category: {
        type: String,
        default: "General"
    }
})

const taskModel = mongoose.model("tasks", taskSchema)

export default taskModel;