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
  @HostBinding('class') classes = 'f-1-1';
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
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
        console.error('Something enexpected happaned');
        console.error(err);
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
