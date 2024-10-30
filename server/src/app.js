import express from "express";
import dotenv from "dotenv";

dotenv.config();

import db from "./database/database.js";

db();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

import router from "../src/routes/userRoutes.js";
app.use("/api", router);

app.get("/", (req, res) => res.json({ message: "hello" }));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
