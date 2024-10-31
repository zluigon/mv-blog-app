import User from "../model/User.js";
import Blog from "../model/Blog.js";

import bcrypt from "bcrypt";

const seed = async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
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
    ]);

    const blogs = await Blog.create([
      {
        title: "Alice's First Blog Post",
        author: users[0]._id,
        content: "This is the content of Alice's first blog post",
      },
      {
        title: "Bob's First Blog Post",
        author: users[1]._id,
        content: "This is the content of Bob's first blog post.",
      },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { blogs: [blogs[0]._id] });
    await User.findByIdAndUpdate(users[1]._id, { blogs: [blogs[1]._id] });

    console.log("Database seeded successfuly");
  } catch (error) {
    console.log(error);
  }
};

export default seed;
