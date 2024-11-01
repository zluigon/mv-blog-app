import { Component, Input } from "@angular/core";

import { DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { Blog } from "../interfaces/blog.model";

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
}
