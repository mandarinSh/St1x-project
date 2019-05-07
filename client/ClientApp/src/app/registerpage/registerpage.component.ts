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

  nickName = '';
  password = '';
  confPassword = '';

  constructor(private router: Router,
    private webconService: WebconnectionService) { }

  ngOnInit() {
  }

  onSigningUp() {
    if (this.password === this.confPassword) {

      const registrationObject = {
        'nickname': this.nickName,
        'password': this.password
      };

      // TODO post request
      // this.userId =
      this.webconService.register(registrationObject)
        .subscribe(data => {
          console.log(data);
          this.updateConfiguration(data);
        });

    } else {
      alert('Passwords are not the same');
    }
  }

  protected updateConfiguration(data: any) {
    console.log(data);
    this.userId = data.user.id;
    if (this.userId === null) {
      // alert('Cannot Register!');
      this.errorMsg = 'Can not register!';
    } else {
      this.router.navigate(['/loginpage']);
    }

  }
}
