import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher, MyPasswordErrorStateMatcher } from '../_services/validators.service';
import { User } from '../_models/user';
import { error } from 'console';
import { Router } from '@angular/router';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  passMatcher = new MyPasswordErrorStateMatcher();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   confirmPassword: new FormControl('', [Validators.required])
    // }, this.passwordMatchValidator);
    this.createRegidterForm();
  }

  createRegidterForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        organization: [''],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.user.editorType = 'standart';
      this.authService.register(this.user).subscribe(() =>{
        console.log("reg seccess");
      }, error => {
        console.log(error);
      }, () => {
        console.log(this.user);
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/scales']);
        });
      });
    }
  }
}
