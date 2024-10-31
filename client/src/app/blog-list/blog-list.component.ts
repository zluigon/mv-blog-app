import { Component, OnInit, signal, WritableSignal } from "@angular/core";

import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule, MatCardFooter } from "@angular/material/card";

import { Blog } from "../interfaces/blog.model";
import { BlogService } from "../services/blog.service";

@Component({
  selector: "app-blog-list",
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCardFooter,
  ],
  templateUrl: "./blog-list.component.html",
  styles: ``,
})
export class BlogListComponent implements OnInit {
  // blogs$: Blog[] = [
  //   {
  //     _id: "3",
  //     title: "Alice's First Blog Post",
  //     author: "users[0]._id",
  //     createdAt: "10/31/24",
  //     content: "This is the content of Alice's first blog post",
  //   },
  //   {
  //     _id: "4",
  //     title: "Bob's First Blog Post",
  //     author: "users[1]._id",
  //     createdAt: "10/31/24",
  //     content: "This is the content of Bob's first blog post.",
  //   },
  // ];
  blogs$ = {} as WritableSignal<Blog[]>;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe({
      next: () => this.fetchBlogs(),
    });
  }

  private fetchBlogs(): void {
    this.blogs$ = this.blogService.blogs$;
    this.blogService.getBlogs();
  }
}
