import userModel from "../models/authModel.js";
import refreshTokenModel from "../models/refreshModel.js";
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

export const findUserByEmail = async (email) => {
    if (!email) {
        throw createHttpError.BadRequest("Invalid credentials")
    }
    const user = await userModel.findOne({email: email})

    if (!user) {
        throw createHttpError.Forbidden("User not found")
    }
    return user;
}

export const storeRefreshToken = async (userId, refreshToken) => {
    if (!userId || !refreshToken) {
        throw createHttpError.BadRequest("Invalid data")
    }
    const stored = await refreshTokenModel.findOneAndUpdate({ userId: userId }, { token: refreshToken }, { new: true, upsert: true })
}

export const findUserInStoredRefreshToken = async (userId) => {
    if(!userId) {
        throw createHttpError.BadRequest("Invalid data")
    }
    const user = await refreshTokenModel.findOne({userId: userId})

    return user
}

export const findUserAndUpdate = async (email,resetToken, resetTokenExpiry) => {
    if (!resetToken || !resetTokenExpiry) {
        throw createHttpError.BadRequest("Invalid data")
    }

    await userModel.findOneAndUpdate({email: email}, {resetToken: resetToken, resetTokenExpiry: resetTokenExpiry})

}

export const findUserAndUpdatePassword = async (token, password) => {
    if (!token || !password) {
        throw createHttpError.BadRequest("Invalid data")
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.findOne({resetToken: token})
    
    user.resetToken = ""
    user.resetTokenExpiry = ""
    user.password = hashedPassword

    user.save()
}

export const findUserByResetToken = async (resetToken) => {
    if (!resetToken) {
        throw createHttpError.BadRequest("Invalid data")
    }

    const user = await userModel.findOne({resetToken: resetToken, resetTokenExpiry: { $gt: Date.now() },})

    if (!user) {
        throw createHttpError.BadRequest("Invalid or expired token")
    }

    return user
}

export const findUserResetTokenAndDelete = async (resetToken) => {
    await resetPasswordTokenModel.findOneAndDelete({resetToken})

}