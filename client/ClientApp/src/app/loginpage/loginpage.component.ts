import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebconnectionService } from '../webconnection.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  errorMsg = 'Error';
  email = '';
  password = '';

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onLogIn(email: string, password: string) {
    this.email = email;
    this.password = password;
    // TODO: login and password validation

    const signInObject = {
      'email' : this.email,
      'password' : this.password
    };

    this.webconService.signIn(signInObject);
    this.router.navigate(['/dialogs']);
  }

  onSignIn() {
    this.router.navigate(['/registerpage']);
  }

}
