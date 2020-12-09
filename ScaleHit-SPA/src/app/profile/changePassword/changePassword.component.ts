import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import {
  NgForm,
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher, MyPasswordErrorStateMatcher } from 'src/app/_services/validators.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.touched || isSubmitted));
//   }
// }

// export class MyPasswordErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const invalidCtrl = !!(
//       control &&
//       control.parent.dirty &&
//       control.parent.hasError('mismatch') &&
//       control.touched
//     );
//     // const invalidParent = !!(control && control.parent &&  && control.touched);

//     return invalidCtrl;
//   }
// }

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  password: any = {};
  // verifyPassword;

  passwordForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  passMatcher = new MyPasswordErrorStateMatcher();

  // @ViewChild('passwordForm', {static: true}) passwordForm: NgForm;
  constructor(private authService: AuthService, private fb: FormBuilder, public dialogRef: MatDialogRef<ChangePasswordComponent>) {}

  ngOnInit() {
    this.createPasswordForm();
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(4)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        verifyPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('verifyPassword').value
      ? null
      : { mismatch: true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePassword() {
    // console.log(this.password);
    // console.log(this.verifyPassword);
    // if (this.password.newPassword !== this.verifyPassword){
    //   console.log('not match');
    // }
    // else {
    //   this.authService.updatePassword(this.authService.decodedToken.nameid, this.password).subscribe(next => {
    //     this.passwordForm.reset();
    //     console.log('passwordChanged');
    //   }, error => {
    //     console.log(error);
    //   });
    // }
  }
}
