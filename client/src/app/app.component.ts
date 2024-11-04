import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavbarComponent } from "./navbar/navbar.component";
import { BlogListComponent } from "./blog-list/blog-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BlogListComponent],
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "client";
}
