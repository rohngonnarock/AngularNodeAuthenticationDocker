import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from './config.enum';

@Injectable()
export class AuthService {
  private registerUrl = `${Config.url}/api/register`;
  private loginUrl = `${Config.url}/api/login`;

  constructor(private http: HttpClient, private router: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}