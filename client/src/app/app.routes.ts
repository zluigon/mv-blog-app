import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";

export const routes: Routes = [
  { path: "blogs", component: BlogListComponent, title: "Blog List" },
  { path: "blogs/:id", component: BlogDetailsComponent, title: "Blog" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
