import { Component, Input } from "@angular/core";

import { DatePipe } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { Blog } from "../interfaces/blog.model";
import { BlogService } from "../services/blog.service";

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.css",
})
export class BlogComponent {
  @Input() blog!: Blog;

  constructor(private router: Router, private blogService: BlogService) {}


  // need to get token and pass it 
  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog._id!).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Failed to delete blog");
        console.log(error);
      },
    });
    this.blogService.getBlogs();
  }

  
}
