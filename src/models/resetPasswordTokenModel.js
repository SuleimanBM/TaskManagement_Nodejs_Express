import mongoose from "mongoose";
import db from "../config/db.js"


const resetPasswordTokenSchema = new mongoose.Schema({
    resetToken:{
        type: String,
        required: true,
    },
    resetToken:{
        type: Date,
        required: true,
    }
})

const resetPasswordTokenModel = mongoose.model("refreshToken", resetPasswordTokenSchema)

export default resetPasswordTokenModel