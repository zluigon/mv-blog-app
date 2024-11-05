import { Component, OnInit, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DatePipe } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { BlogService } from "../services/blog.service";
import { Blog } from "../interfaces/blog.model";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-blog-details",
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: "./blog-details.component.html",
  styleUrl: "./blog-details.component.css",
})
export class BlogDetailsComponent implements OnInit {
  blog$ = {} as WritableSignal<Blog>;
  loggedInUserId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get("id");
    if (blogId) {
      this.blog$ = this.blogService.blog$;
      this.blogService.getBlogById(blogId);
      this.loggedInUserId = this.authService.getUserId();
    }
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog$()._id!).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Failed to delete blog");
      },
    });
    this.blogService.getBlogs();
  }

  onEdit() {
    this.router.navigate([`/edit-post/${this.blog$()._id}`]);
  }

  get isAuthor(): boolean {
    return this.blog$().author._id === this.loggedInUserId;
  }
}
