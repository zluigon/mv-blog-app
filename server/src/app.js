import express from "express";
import path from "path";

import db from "./database/database.js";
import dotenv from "dotenv";

dotenv.config();

db();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
