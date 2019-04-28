import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebconnectionService } from '../webconnection.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent implements OnInit {

  errorMsg = 'Error';
  nickname = '';
  password = '';
  currentUserId: number = null;

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onSignIn() {

    // this.email = 'user_1@mail.ru';
    // this.password = '12345';
    // TODO: login and password validation

    if ((this.nickname === '') || (this.password === '')) {
      alert('Invalid Login or Password!');
      return;
    }

    const signInObject = {
      'nickname': this.nickname,
      'password': this.password
    };

    this.webconService.signIn(signInObject)
      .subscribe(
        data => { this.updateConfiguration(data); },
        error => this.errorMsg = String(error)
      );

    // console.log(this.webconService.currentUserId);
    // this.router.navigate(['/dialogs']);

    console.log('sign in');
  }

  onSignUp() {
    this.router.navigate(['/registerpage']);
  }

  private updateConfiguration(data: any) {
    this.currentUserId = data.user.id;
    this.webconService.currentUserId = data.user.id;
    console.log('id data is: ' + data.user.id);
    console.log('id this is: ' + this.currentUserId);
    console.log('id service is: ' + this.webconService.currentUserId);
    if (this.currentUserId === null) {
      console.log('Cannot log in');
    } else {
      this.router.navigate(['/dialogpage']);
    }
  }

}
