import mongoose from "mongoose";
import db from "../config/db.js"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    resetToken: {
        type: String,
        
    },
    resetTokenExpiry: {
        type: Date,
        
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel;