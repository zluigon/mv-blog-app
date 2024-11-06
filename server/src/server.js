import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./database/database.js";

import userRouter from "../src/routes/userRoutes.js";
import blogRouter from "../src/routes/blogRoutes.js";

dotenv.config();
db();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => res.json({ message: "hello there" }));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
