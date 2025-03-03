import jsonwebtoken from 'jsonwebtoken';

export const genrateToken = async(userId) => { 
    jsonwebtoken.sign({ userId }, process.env , {
    expiresIn: "15d",
})}
