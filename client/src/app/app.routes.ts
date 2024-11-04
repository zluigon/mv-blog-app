import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";

export const routes: Routes = [
  { path: "", component: BlogListComponent, title: "Blog List" },
  { path: "blogs/:id", component: BlogDetailsComponent, title: "Blog" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "register", component: RegisterComponent, title: "Register" },
  {
    path: "create-post",
    component: CreateBlogComponent,
    title: "Create New Post",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
