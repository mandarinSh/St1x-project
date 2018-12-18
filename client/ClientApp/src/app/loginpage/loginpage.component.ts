import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  errorMsg = 'Error';
  email = '';
  password = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogIn(email: string, password: string) {
    this.email = email;
    this.password = password;
    // TODO: login and password validation
    this.router.navigate(['/dialogs']);
  }

  onSignIn() {
    this.router.navigate(['/registerpage']);
  }

}
