import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgForm } from "@angular/forms";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  @ViewChild("register-form") registerForm!: NgForm;
  username: string = "";
  password: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log("Registration successful", response);
        this.authService.storeToken(response.token);
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        console.log("Registration error: ", error);
        alert("Registration error");
        this.resetForm();
      },
    });
  }

  resetForm() {
    this.registerForm.resetForm();
  }
}
