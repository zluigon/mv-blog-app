import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, requried: true },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: { type: Date },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
