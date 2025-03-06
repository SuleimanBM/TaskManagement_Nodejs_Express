import mongoose from "mongoose";
import db from "../config/db.js"


const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
})

const refreshTokenModel = mongoose.model("refreshToken",refreshTokenSchema)

export default refreshTokenModel