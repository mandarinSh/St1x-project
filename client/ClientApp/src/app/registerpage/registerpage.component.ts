import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  errorMsg = 'Error';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSigningUp(userName: string, nickName: string, email: string,
    password: string, confPassword: string) {
      if (password === confPassword) {

        let registrationObject = {
          "name" : userName,
          "nickName" : nickName,
          "email" : email,
          "password" : password
        };

      // TODO post request
      // this.webconService.post(registrationObject)
        // .subscribe(this.registrationObject.push(registrationObject));


         this.router.navigate(['/dialogpage']);
      } else {
        alert('Passwords are not the same');
      }
    }

}
