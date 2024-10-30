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
        .json({ message: "Please include all fields to register" });
      return;
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400).json({ message: "Unable to create user" });
      return;
    } else {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    console.log({ Error: error.message });
    next(error);
  }
});

export default router;
