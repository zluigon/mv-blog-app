import asyncHandler from "express-async-handler";

import User from "../model/User.js";
import Blog from "../model/Blog.js";

import isValidObjectId from "../utils/isValidObjectId.js";

/**
 * @desc     Create single ticket by user
 * @route    POST api/tickets
 * @access   Private
 */
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(401).json({ message: "Please include all fields" });
    return;
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const blog = await Blog.create({ title, content, author: req.user.id });

  res.status(201).json(blog);
});
