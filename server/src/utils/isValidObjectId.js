import mongoose from "mongoose";

const isValidObjectId = (id) => {
  if (mongoose.isValidObjectId(id)) {
    if (String(new mongoose.Types.ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

export default isValidObjectId;
