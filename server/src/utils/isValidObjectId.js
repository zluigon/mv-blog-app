import { Types } from "mongoose";

const isValidObjectId = (id) => {
  if (Types.ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

export default isValidObjectId;
