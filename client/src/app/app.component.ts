import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MatToolbarModule } from "@angular/material/toolbar";
import { BlogListComponent } from "./blog-list/blog-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, BlogListComponent, MatToolbarModule],
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "client";
}
