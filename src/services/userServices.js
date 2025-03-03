import userModel from "../models/userModels.js";
import createHttpError from "http-errors";
import { hashPassword } from "../utils/passwordUtil.js";


export const registerUser = async (name, email, password,) => {
    if(!name || !email || !password) {
        throw createHttpError.BadRequest("Invalid data")
    }
    password = await hashPassword(password);
    const user = await userModel.create({ name, email, password})
    user.save()
    return user
}


export const loginUser = async (email) => {
    if (!email) {
        throw createHttpError.BadRequest("Invalid data")
    }
    const user = await userModel.findOne({email: email})
    return user; 
}