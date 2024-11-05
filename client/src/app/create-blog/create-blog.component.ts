import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { FormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { BlogService } from "../services/blog.service";

@Component({
  selector: "app-create-blog",
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: "./create-blog.component.html",
  styleUrl: "./create-blog.component.css",
})
export class CreateBlogComponent {
  title!: string;
  content!: string;

  constructor(private router: Router, private blogService: BlogService) {}

  onSubmit() {
    this.blogService.createBlog(this.title, this.content).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
