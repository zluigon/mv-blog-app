export interface Blog {
  title: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  comment?: string[];
  _id?: string;
}
