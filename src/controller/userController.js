import * as userServices from "../services/userServices.js";
import { comparePassword } from "../utils/passwordUtil.js";
import { genrateToken } from "../utils/tokenUtil.js";

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
        const {emial, password} = req.body;
        const user = await userServices.loginUser(emial);
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({success: false, message: "Passwords do not match"})
        }
        const token = await genrateToken(user._id);
        return res.status(200).json({success: true, token})
    }catch(error){
        next(error);
    }
}