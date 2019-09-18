import { Component, OnInit, HostBinding } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { isErrorResponse } from 'src/app/types/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { JWT } from 'src/app/types/jwt';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  customError: string;
  @HostBinding('class') classes = 'f-1-1';
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    firstName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  onSubmit() {
    this.auth.register({
      ...this.registerForm.value
    }).subscribe((resp: JWT) => {
      console.log(resp);
      this.router.navigate(['/']);
      this.openSnackBar(`Welcome, ${this.auth.getUser().username}`);
    },
    (err: HttpErrorResponse) => {
      if (isErrorResponse(err.error)) {
        const errors = err.error.errors;
        const controls = this.registerForm.controls;

        if (errors.Email) {
          controls.email.setErrors({ backend: errors.Email });
        }

        if (errors.Username) {
          controls.username.setErrors({backend: errors.Username});
        }

        if (errors.Password) {
          controls.password.setErrors({backend: errors.Password});
        }

        if (errors.FirstName) {
          controls.firstName.setErrors({backend: errors.FirstName});
        }

        if (errors.LastName) {
          controls.lastName.setErrors({backend: errors.LastName});
        }
      } else {
        this.customError = err.error.message;
        console.log(this.customError);
        if (this.customError.includes('Username')) {
          this.registerForm.controls.username.setErrors({ invalid: true });
        } else {
          this.registerForm.setErrors({invalid: true});
        }

        if (this.customError.includes('Email')) {
          this.registerForm.controls.email.setErrors({ invalid: true });
        } else {
          this.registerForm.setErrors({ invalid: true });
        }
      }
    });
  }

  displayErrors(name: string) {
    if (this.registerForm.get(name).errors) {
      return this.registerForm.get(name).errors.backend;
    }

    return [];
  }

  hasBackendErrors(name: string) {
    if (this.registerForm.get(name).errors && this.registerForm.get(name).errors.backend) {
      return true;
    }

    return false;
  }
}
