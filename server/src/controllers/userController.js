import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

import User from "../model/User.js";

/**
 * @desc     Register a new user
 * @route    POST api/users
 * @access   Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please include all fields to register" });
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
});

/**
 * @desc     Login user
 * @route    POST api/users/login
 * @access   Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid login credentials" });
    return;
  } else {
    res.status(200).json({
      message: "Successful login",
      _id: user._id,
      username: user.name,
      token: generateToken(user._id),
    });
  }
});
