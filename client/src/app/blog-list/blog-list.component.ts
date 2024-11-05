import { Component, OnInit, WritableSignal } from "@angular/core";

import { MatGridListModule } from "@angular/material/grid-list";

import { Blog } from "../interfaces/blog.model";
import { BlogService } from "../services/blog.service";
import { BlogComponent } from "../blog/blog.component";

@Component({
  selector: "app-blog-list",
  standalone: true,
  imports: [BlogComponent],
  templateUrl: "./blog-list.component.html",
  styleUrl: "./blog-list.component.css",
})
export class BlogListComponent implements OnInit {
  blogs$ = {} as WritableSignal<Blog[]>;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  private fetchBlogs(): void {
    this.blogs$ = this.blogService.blogs$;
    this.blogService.getBlogs();
  }
}
