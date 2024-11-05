import { Component, OnInit, WritableSignal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { FormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { BlogService } from "../services/blog.service";
import { Blog } from "../interfaces/blog.model";

@Component({
  selector: "app-edit-post",
  standalone: true,
  imports: [MatButtonModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: "./edit-post.component.html",
  styleUrl: "./edit-post.component.css",
})
export class EditPostComponent implements OnInit {
  blog$ = {} as WritableSignal<Blog>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get("id");

    if (blogId) {
      this.blog$ = this.blogService.blog$;
      this.blogService.getBlogById(blogId);
    }
  }

  onSubmit() {
    this.blogService
      .updateBlog(this.blog$()._id!, this.blog$().title, this.blog$().content)
      .subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: (error) => {
          alert("Failed to update blog");
        },
      });
  }
}
