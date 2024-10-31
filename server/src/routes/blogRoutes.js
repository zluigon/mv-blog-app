import { Router } from "express";

import protectedRoute from "../middleware/authMiddleware.js";
import {
  createBlog,
  getBlogId,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlogId);
blogRouter.post("/", protectedRoute, createBlog);
blogRouter.put("/:id", protectedRoute, updateBlog);

export default blogRouter;
