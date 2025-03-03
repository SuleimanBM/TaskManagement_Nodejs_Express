import jsonwebtoken from 'jsonwebtoken';

export const genrateToken = async(userId) => { 
    const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET , {
    expiresIn: "15d",})

    return token;
}
