import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: () => Date.now() },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
