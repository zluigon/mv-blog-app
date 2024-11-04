import dotenv from "dotenv";

import User from "../model/User.js";
import Blog from "../model/Blog.js";
import Comment from "../model/Comment.js";

import db from "./database.js";
import mongoose from "mongoose";

import bcrypt from "bcrypt";

dotenv.config();

const seed = async () => {
  try {
    await db();

    await User.deleteMany({});
    await Blog.deleteMany({});
    await Comment.deleteMany({});
    console.log("Existing data cleared");

    const hashedPassword = await bcrypt.hash("test", 10);

    const users = await User.create([
      {
        username: "alice",
        password: hashedPassword,
      },
      {
        username: "bob",
        password: hashedPassword,
      },
      {
        username: "charlie",
        password: hashedPassword,
      },
      {
        username: "dale",
        password: hashedPassword,
      },
      {
        username: "earl",
        password: hashedPassword,
      },
    ]);

    const blogs = [];

    for (let i = 0; i < 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newBlog = await Blog.create({
        title: `Blog Post ${i + 1}`,
        author: randomUser._id,
        content: `This is the content for blog post ${i + 1}`,
      });
      blogs.push(newBlog);

      await User.findByIdAndUpdate(randomUser._id, { blogs: newBlog._id });

      for (let j = 0; j < 3; j++) {
        const randomCommentUser =
          users[Math.floor(Math.random() * users.length)];
        const newComment = await Comment.create({
          content: `This is comment ${j + 1} for blog post ${i + 1}`,
          blog: newBlog._id,
          author: randomCommentUser._id,
        });

        await Blog.findByIdAndUpdate(newBlog._id, { comment: newComment._id });
      }
    }

    console.log("Database seeded successfuly");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
};

seed();
