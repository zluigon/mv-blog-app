import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blog } from "../interfaces/blog.model";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private url = "http://localhost:3000/api/blogs";
  blogs$ = signal<Blog[]>([]);
  blog$ = signal<Blog>({} as Blog);

  constructor(private httpClient: HttpClient) {}

  private refreshBlogs() {
    this.httpClient.get<Blog[]>(`${this.url}/`).subscribe((blogs) => {
      this.blogs$.set(blogs);
    });
  }

  getBlogs() {
    this.refreshBlogs();
    return this.blogs$;
  }

  getBlogById(id: string) {
    this.httpClient.get<Blog>(`${this.url}/${id}`).subscribe((blog) => {
      this.blog$.set(blog);
      return this.blog$;
    });
  }

  createBlog(blog: Blog) {
    return this.httpClient.post(`${this.url}/`, blog, {
      responseType: "text",
    });
  }

  updateBlog(id: string, blog: Blog) {
    return this.httpClient.put(`${this.url}/${id}`, blog, {
      responseType: "text",
    });
  }

  // need to accept token
  deleteBlog(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      responseType: "text",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  }
}
