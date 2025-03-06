import * as userServices from "../services/authServices.js";
import { comparePassword } from "../utils/passwordUtil.js";
import { genrateAccessToken, genrateRefreshToken, verifyRefreshToken,} from "../utils/generateToken.js";
import { sendResetEmail } from "../utils/sendMail.js";


export const registerUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const user = await userServices.registerUser(name, email, password);
        const token = await genrateToken(user._id);
        return res.status(200).json({success: true,message: "Registration successful", token: token})
    }catch(error){
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await userServices.findUserBy(email);

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json({success: false, message: "Passwords do not match"})
        }

        const newAccessToken = await genrateAccessToken(user._id);
        const newRefreshToken = await genrateRefreshToken(user._id);

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

        await userServices.findUserBy(email);

        const resetToken = await genrateRefreshToken();
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; 

        await userServices.storeRefreshToken(resetToken, resetTokenExpiry)

        const resetUrl = `http://localhost:8000/auth/reset-password?token=${resetToken}`;

        await sendResetEmail(email,resetUrl)

        return res.status(200).json({success: true, message: "Password reset email sent"})
    }catch(error){
        next(error)
    }
}

export const resetPassword = async (req, res, next)=> {
        const { token, newPassword } = req.body;

        // Find the user by the reset token
        const user = await userServices.findUserByResetToken(token,password);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });

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

        const user = await userServices.findUserInRefreshToken(userId);

        if (user.token !== token) {
            return res.status(403).json({ message: 'Refresh token does not match stored token' });
        }


        const newAccessToken = await genrateAccessToken(userId);
        const newRefreshToken = await genrateRefreshToken(userId);

        
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