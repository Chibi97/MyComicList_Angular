import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { validateRegex } from 'src/app/shared/validators/regex.directive';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthorWrite, AuthorRead } from 'src/app/types/responses';
import { isErrorResponse } from 'src/app/types/utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent {
  customError = '';
  authorForm = this.fb.group({
    firstname: ['', [Validators.required, validateRegex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]],
    lastname: ['', [Validators.required, validateRegex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]]
  });

  btnText: string;
  mode: 'Edit'|'New';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthorFormComponent>,
    private service: AuthorsService,
    @Inject(MAT_DIALOG_DATA) private data: AuthorRead
  ) {
    if (data) {
      const firstName = data.fullName.substr(0, data.fullName.indexOf(' '));
      const lastName = data.fullName.substr(data.fullName.indexOf(' ') + 1);
      this.authorForm.setValue({
        firstname: firstName,
        lastname: lastName
      });
      this.mode = 'Edit';
      this.btnText = 'Update Author';
    } else {
      this.mode = 'New';
      this.btnText = 'Add New Author';
    }
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayErrors(name: string) {
    if (this.authorForm.get(name).errors) {
      return this.authorForm.get(name).errors.backend;
    }

    return [];
  }

  clearError() {
    if (this.customError !== '') {
      this.customError = '';
      this.authorForm.controls.firstname.setErrors(null);
      this.authorForm.controls.lastname.setErrors(null);
    }
  }

  onSubmit() {
    if (this.mode === 'New') {
      this.service.addNewAuthor(this.authorForm.value)
        .subscribe(() => {
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          if (isErrorResponse(err.error)) {
            if (err.error.errors.firstname) {
              this.authorForm.controls.firstname.setErrors({ backend: err.error.errors.firstname });
            }

            if (err.error.errors.lastname) {
              this.authorForm.controls.lastname.setErrors({ backend: err.error.errors.lastname });
            }

          } else {
            this.customError = err.error.message;
            this.authorForm.controls.firstname.setErrors({ invalid: true });
            this.authorForm.controls.lastname.setErrors({ invalid: true });
          }
        });
    } else if (this.mode === 'Edit') {
      this.service.editAuthor({ ...this.authorForm.value, id: this.data.id})
        .subscribe(() => {
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          if (isErrorResponse(err.error)) {
            if (err.error.errors.firstname) {
              this.authorForm.controls.firstname.setErrors({ backend: err.error.errors.firstname });
            }

            if (err.error.errors.lastname) {
              this.authorForm.controls.lastname.setErrors({ backend: err.error.errors.lastname });
            }

          } else {
            this.customError = err.error.message;
            this.authorForm.controls.firstname.setErrors({ invalid: true });
            this.authorForm.controls.lastname.setErrors({ invalid: true });
          }
        });
    }
  }

}
