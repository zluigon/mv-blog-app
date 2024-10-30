import mongoose from "mongoose";
import Blog from "./model/Blog.js";
import User from "./model/User.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const testUser = new User({
  username: "y",
  password: "abz",
});

await testUser.save();

const article = new Blog({
  title: "First Blog",
  author: testUser.id,
  content: "This is the first blog post using mongoose",
});

await article.save();

testUser.blogs.push(article.id);

const firtArticle = await Blog.findOne({});
console.log(firtArticle);

const firstUser = await User.findOne({});
console.log(firstUser);
