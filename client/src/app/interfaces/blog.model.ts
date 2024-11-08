import { User } from "./user.model";

export interface Blog {
  title: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  comment?: string[];
  _id?: string;
}
