import bcrypt from "bcrypt";

export const hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const comparePassword = async(enteredPassword, storedPassword) => {
    const match = await bcrypt.compare(enteredPassword, storedPassword);
    return match ;
}