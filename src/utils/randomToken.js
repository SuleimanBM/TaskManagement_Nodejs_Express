import crypto from "crypto";

const generateRandomToken = () => {
    return crypto.randomBytes(64).toString("hex")
};

export default generateRandomToken