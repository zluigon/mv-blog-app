import { Router } from "express";

import protectedRoute from "../middleware/authMiddleware.js";
import { createBlog } from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.post("/", protectedRoute, createBlog);

export default blogRouter;
