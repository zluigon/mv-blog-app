import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Blog } from "../interfaces/blog.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private url = "http://localhost:3000/api/blogs";
  blogs$ = signal<Blog[]>([]);
  blog$ = signal<Blog>({} as Blog);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

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

  createBlog(title: string, content: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(
      `${this.url}/`,
      { title, content },
      {
        responseType: "text",
        headers,
      }
    );
  }

  updateBlog(id: string, title: string, content: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put(
      `${this.url}/${id}`,
      { title, content },
      {
        responseType: "text",
        headers,
      }
    );
  }

  deleteBlog(id: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete(`${this.url}/${id}`, {
      responseType: "text",
      headers,
    });
  }
}
