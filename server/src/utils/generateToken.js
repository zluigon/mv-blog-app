import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

//Generate token for user registration and login
const generateToken = (userId) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
