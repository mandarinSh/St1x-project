import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebconnectionService } from '../webconnection.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  errorMsg = 'Error';
  userId: number;

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onSigningUp(firstName: string, lastName: string, nickName: string, email: string,
    password: string, confPassword: string) {
      if (password === confPassword) {

        const registrationObject = {
          'firstName' : firstName,
          'lastName' : lastName,
          'nickName' : nickName,
          'email' : email,
          'password' : password
        };

      // TODO post request
      this.userId = this.webconService.register(registrationObject)
        .subscribe(data => {
          console.log(data);
          this.userId = data.id; });

         this.router.navigate(['/dialogpage']);
      } else {
        alert('Passwords are not the same');
      }
    }

}
