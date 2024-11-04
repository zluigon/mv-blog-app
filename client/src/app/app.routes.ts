import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const routes: Routes = [
  { path: "blogs", component: BlogListComponent, title: "Blog List" },
  { path: "blogs/:id", component: BlogDetailsComponent, title: "Blog" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "register", component: RegisterComponent, title: "Register" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
