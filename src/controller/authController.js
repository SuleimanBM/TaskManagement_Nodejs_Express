import * as userServices from "../services/authServices.js";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken,} from "../utils/generateToken.js";
import sendResetEmail from "../utils/sendResetEmail.js";
import generateRandomToken from "../utils/randomToken.js";
import { fileURLToPath } from 'url';
import path from "path";
import { dirname } from 'path';


export const googleAuth = async (req, res, next) => {
    res.status(200).send("success");
}
export const registerUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;

        const user = await userServices.registerUser(name, email, password);

        const newAccessToken = await generateAccessToken(user._id);
        const newRefreshToken = await generateRefreshToken(user._id);

        await userServices.storeRefreshToken(user._id, newRefreshToken)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: false,
            secure: false,      // Use true in production
            sameSite: 'Strict', // Adjust as needed
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ success: true,message: "Registration Successful", newAccessToken })
    }catch(error){
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await userServices.findUserByEmail(email);

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json({success: false, message: "Passwords do not match"})
        }

        const newAccessToken = await generateAccessToken(user._id);
        const newRefreshToken = await generateRefreshToken(user._id);

        await userServices.storeRefreshToken(user._id,newRefreshToken)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: false,
            secure: false,      // Use true in production
            sameSite: 'Strict', // Adjust as needed
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({success: true, newAccessToken})

    }catch(error){
        next(error);
    }
}

export const forgotPassword = async (req, res, next)=> {
    try {
        const {email} = req.body;

        const user = await userServices.findUserByEmail(email);

        const resetToken = generateRandomToken();
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; 

        await userServices.findUserAndUpdate(email, resetToken, resetTokenExpiry)

        const resetUrl = `http://localhost:8000/auth/reset-password?token=${resetToken}`;

        await sendResetEmail(email,resetUrl)

        return res.status(200).json({success: true, message: "Password reset email sent"})
    }catch(error){
        next(error)
    }
}

export const getResetPasswordPage = async (req, res, next)=> {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    try {
        return res.sendFile(path.join(__dirname, '../views/reset-password.html'));
    }catch(error){
        next(error)
    }
}

export const resetPassword = async (req, res, next)=> {
       try {
           const { token, newPassword } = req.body;

           // Find the user by the reset token
           const user = await userServices.findUserByResetToken(token);

           if (!user) {
               return res.status(400).json({ message: "Invalid or expired token" });
           }

           await userServices.findUserAndUpdatePassword(token, newPassword, null)

           res.status(200).json({ message: "Password reset successful" });

       }catch(error){
        next(error)
       }
}

export const refreshToken = async (req, res, next) => {
    try{
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }

        const decoded = await verifyRefreshToken(token);
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        const userId = decoded.userId

        const user = await userServices.findUserInStoredRefreshToken(userId);

        if (user.token !== token) {
            return res.status(403).json({ message: 'Refresh token does not match stored token' });
        }


        const newAccessToken = await generateAccessToken(userId);
        const newRefreshToken = await generateRefreshToken(userId);


        await userServices.storeRefreshToken(user._id, newRefreshToken)

        res.status(200).cookie('refreshToken', newRefreshToken, {
            httpOnly: false,
            secure: false,      // Use true in production
            sameSite: 'Strict', // Adjust as needed
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken: newAccessToken });

    }catch(error){
        next(error)
    }

}