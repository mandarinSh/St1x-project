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
  currentUserId: number;

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onSignIn() {

    // this.email = 'user_1@mail.ru';
    // this.password = '12345';
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
      .subscribe(data => this.updateConfiguration(data));

    // console.log(this.webconService.currentUserId);
    // this.router.navigate(['/dialogs']);

    console.log('email is:  ' + this.email);
  }

  onSignUp() {
    this.router.navigate(['/registerpage']);
  }

  private updateConfiguration(data: any) {
    this.currentUserId = data.user_body.id;
    this.webconService.currentUserId = data.user_body.id;
    console.log('id is: ' + data.user_body.id);
    console.log(this.webconService.currentUserId);
    if (this.currentUserId === undefined) {
      console.log('Cannot log in');
    } else {
      this.router.navigate(['/dialogs']);
    }
  }

}
