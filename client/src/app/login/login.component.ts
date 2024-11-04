import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgForm } from "@angular/forms";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  @ViewChild("loginForm") loginForm!: NgForm;
  username!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log("Login successful", response);
        this.authService.storeToken(response.token);
        this.router.navigate(["/blogs"]);
      },
      error: (error) => {
        console.log("Login failed", error);
        alert("Invalid credentials");
        this.resetForm();
      },
    });
  }

  resetForm() {
    this.loginForm.resetForm();
  }
}
