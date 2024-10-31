import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../model/User.js";

const secret = process.env.JWT_SECRET;

const protectedRoute = asyncHandler(async (req, res, next) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      userToken = req.headers.authorization.split(" ")[1];
      const decodedUserToken = jwt.verify(userToken, secret);

      req.user = await User.findById(decodedUserToken.userId).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
  }

  if (!userToken) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
});

export default protectedRoute;
