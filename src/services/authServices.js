import userModel from "../models/authModel.js";
import refreshTokenModel from "../models/refreshModel.js";
import createHttpError from "http-errors";
import { hashPassword } from "../utils/passwordUtil.js";
import resetPasswordTokenModel from "../models/resetPasswordTokenModel.js";


export const registerUser = async (name, email, password,) => {
    if(!name || !email || !password) {
        throw createHttpError.BadRequest("Invalid data")
    }
    password = await hashPassword(password);
    const user = await userModel.create({ name, email, password})
    user.save()
    return user
}

export const findUserBy = async (field) => {
    if (!email) {
        throw createHttpError.BadRequest("Invalid credentials")
    }
    const user = await userModel.findOne({field})
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

export const storeResetToken = async (resetToken, resetTokenExpiry) => {
    if (!resetToken || !resetTokenExpiry) {
        throw createHttpError.BadRequest("Invalid data")
    }

    await resetPasswordTokenModel.create({resetToken, resetTokenExpiry})
}

export const findUserByResetToken = async (resetToken, resetTokenExpiry) => {
    if (!resetToken || !resetTokenExpiry) {
        throw createHttpError.BadRequest("Invalid data")
    }

    const user = await resetPasswordTokenModel.findOne({resetToken: token, resetTokenExpiry: { $gt: Date.now() },})

    return user
}

export const findUserResetTokenAndDelete = async (resetToken) => {
    await resetPasswordTokenModel.findOneAndDelete({resetToken})

}