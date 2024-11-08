import asyncHandler from "express-async-handler";

import User from "../model/User.js";
import Blog from "../model/Blog.js";
import Comment from "../model/Comment.js"

import isValidObjectId from "../utils/isValidObjectId.js";

/* 
  get - public
  get/:id - public
  post - private
  put - private
  delete - private
*/

/**
 * @desc     Get blogs
 * @route    GET api/blogs/
 * @access   Public
 */
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("author");
  res.status(200).json(blogs);
});

/**
 * @desc     Get blog by id
 * @route    GET api/blogs/:id
 * @access   Public
 */
export const getBlogId = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: `Invalid Blog Id: ${req.params.id}` });
    return;
  }

  let blog = await Blog.findById(req.params.id).populate("author").populate("comment").exec();

  if (!blog) {
    res
      .status(400)
      .json({ message: `Blog NOT_FOUND with id: ${req.params.id}` });
    return;
  }
  res.status(200).json(blog);
});

/**
 * @desc     Create blog
 * @route    POST api/blogs
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

/**
 * @desc     Update blog
 * @route    Put api/blogs/:id
 * @access   Private
 */
export const updateBlog = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: `Invalid Blog Id: ${req.params.id}` });
    return;
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res
      .status(401)
      .json({ message: `Blog NOT_FOUND with id: ${req.params.id}` });
    return;
  }

  if (blog.author.toString() !== req.user.id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );

  res.status(200).json(updatedBlog);
});

/**
 * @desc     Delete blog
 * @route    Delete api/blogs/:id
 * @access   Private
 */
export const deleteBlog = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(401).json({ message: `Invalid Blog Id: ${req.params.id}` });
    return;
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res
      .status(401)
      .json({ message: `Blog NOT_FOUND with id: ${req.params.id}` });
    return;
  }

  if (blog.author.toString() !== req.user.id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const deletedBlog = await blog.deleteOne();
  res.status(200).json({ success: true, deletedBlog });
});
