import { User } from "./user";

export interface Blog {
  title: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  comment?: string[];
  _id?: string;
}
