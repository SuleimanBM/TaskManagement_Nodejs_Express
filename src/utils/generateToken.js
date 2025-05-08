import jsonwebtoken from 'jsonwebtoken';

export const generateAccessToken = async(userId) => { 
    const token = jsonwebtoken.sign({ userId }, process.env.ACCESS_TOKEN_SECRET , {
    expiresIn: "7d",})

    return token;
}

export const generateRefreshToken = async (userId) => {
    const token = jsonwebtoken.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    })

    return token;
}

export const verifyRefreshToken = async (token) => {
    const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
}
