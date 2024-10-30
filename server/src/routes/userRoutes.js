import { Router } from "express";

import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
