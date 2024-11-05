import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api/users";
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInUserId: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.checkLoginStatus();
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/create`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.loggedInUserId = response._id;
          this.storeToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  storeToken(token: string) {
    localStorage.setItem("jwt", token);
  }

  getToken() {
    return localStorage.getItem("jwt");
  }

  logout() {
    localStorage.removeItem("jwt");
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserId(){
    return this.loggedInUserId;
  }

  private checkLoginStatus(): void {
    const token = this.getToken();
    this.loggedIn.next(!!token);
  }
}
