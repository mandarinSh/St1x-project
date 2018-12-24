import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebconnectionService } from '../webconnection.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  providers: [
    WebconnectionService
  ]
})
export class LoginpageComponent implements OnInit {

  errorMsg = 'Error';
  email = '';
  password = '';

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onSignIn() {

    this.email = 'user_1@mail.ru';
    this.password = '12345';
    // TODO: login and password validation

    if ((this.email === '') || (this.password === '')) {
      alert('Invalid Login or Password!');
      return;
    }

    const signInObject = {
      'email' : this.email,
      'password' : this.password
    };

    this.webconService.signIn(signInObject)
      .subscribe(data => console.log(data));
    // this.router.navigate(['/dialogs']);

    console.log('email is:  ' + this.email);
  }

  onSignUp() {
    // this.webconService.signIn({'email' : 'user_1@mail.ru', 'password' : '12345'});
    // this.router.navigate(['/registerpage']);

    console.log('email is:  ' + this.email);
  }

}
