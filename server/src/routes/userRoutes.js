import { Router } from "express";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import User from "../model/User.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json({ message: "Please incluse all fields to register" });
      throw new Error("Please include all fields to register");
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400);
      throw new Error("Invalid user data; user not created");
    } else {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        // token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    console.log({ Error: error.message });
  }
});

export default router;
