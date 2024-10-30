import mongoose from "mongoose";

const db = async () => {
  try {
    mongoose.set("strictQuery", true); //removes DeprecationWarning message
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error with database connection: ${error.message}`);
    process.exit(1);
  }
};

export default db;
