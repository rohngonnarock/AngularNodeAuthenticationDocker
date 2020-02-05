import { Component, OnInit, DebugElement } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {



  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    const loginUserData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.auth.loginUser(loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special']);
        },
        err => console.log(err)
      );
  }
}
