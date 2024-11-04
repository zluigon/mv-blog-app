import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { RouterModule, Router, NavigationEnd } from "@angular/router";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentRoute: string;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  logout() {
    this.authService.logout();
  }

  isLoginPage() {
    return this.currentRoute === "/login";
  }

  isRegisterPage() {
    return this.currentRoute === "/register";
  }

  isHomePage() {
    return this.currentRoute === "/";
  }
}
