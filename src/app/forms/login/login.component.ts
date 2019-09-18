import { Component, OnInit, HostBinding, Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { isErrorResponse } from 'src/app/types/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateRegex } from 'src/app/shared/validators/regex.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1';

  customError = '';
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {}

  displayErrors(name: string) {
    if (this.loginForm.get(name).errors) {
      return this.loginForm.get(name).errors.backend;
    }

    return [];
  }

  clearError() {
    if (this.customError !== '') {
      this.customError = '';
      this.loginForm.controls.username.setErrors(null);
      this.loginForm.controls.password.setErrors(null);
    }
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  onSubmit() {
    const {username, password} = this.loginForm.value;
    this.auth.login({
      username, password
    }).subscribe(() => {
      this.router.navigate(['/admin']);
      this.openSnackBar(`Welcome, ${username}`);
    },
    (err: HttpErrorResponse) => {
      if (isErrorResponse(err.error)) {
        if (err.error.errors.Username) {
          this.loginForm.controls.username.setErrors({backend: err.error.errors.Username});
        }

        if (err.error.errors.Password) {
          this.loginForm.controls.password.setErrors({backend: err.error.errors.Password});
        }

      } else {
        this.customError = err.error.message;
        this.loginForm.controls.username.setErrors({invalid: true});
        this.loginForm.controls.password.setErrors({invalid: true});
      }
    });
  }
}
