import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: any = {};
  verifyPassword;

  @ViewChild('passwordForm', {static: true}) passwordForm: NgForm;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  updatePassword() {
    console.log(this.password);
    console.log(this.verifyPassword);

    if (this.password.newPassword !== this.verifyPassword){
      console.log('not match');
    }
    else {
      this.authService.updatePassword(this.authService.decodedToken.nameid, this.password).subscribe(next => {
        this.passwordForm.reset();
        console.log('passwordChanged');
      }, error => {
        console.log(error);
      });
    }


  }

}
