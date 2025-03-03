import mongoose from "mongoose";

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
        enum: ["low", "medium", "high",]
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"]
    }
})

const taskModel = mongoose.model("tasks", taskSchema)

export default taskModel;