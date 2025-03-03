import userModel from "../models/userModels";
import createHttpError from "http-errors";
import { hashPassword } from "../utils/passwordUtil";


export const registerUser = async (name, email, password,) => {
    if(!name || !email || !password) {
        throw new createHttpError.BadRequest("Invalid data")
    }
    const hashPassword = hashPassword(password);
    const user = await userModel.create({name: name, email: email, password: hashPassword})
    user.save()
    return user
}


export const loginUser = async (email) => {
    if (!email) {
        throw new createHttpError.BadRequest("Invalid data")
    }
    const user = await userModel.findOne({email: email})
    return user; 
}