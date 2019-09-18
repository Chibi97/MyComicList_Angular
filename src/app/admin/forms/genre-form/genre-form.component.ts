import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { validateRegex } from 'src/app/shared/validators/regex.directive';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenresService } from 'src/app/services/genres.service';
import { Genre } from 'src/app/types/responses';
import { HttpErrorResponse } from '@angular/common/http';
import { isErrorResponse } from 'src/app/types/utils';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss']
})
export class GenreFormComponent {
  customError = '';
  genreForm = this.fb.group({
    name: ['', [Validators.required, validateRegex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]]
  });

  btnText: string;
  mode: 'Edit' | 'New';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenreFormComponent>,
    private service: GenresService,
    @Inject(MAT_DIALOG_DATA) private data: Genre
  ) {
    if (data) {
      this.genreForm.setValue({
        name: data.name
      });
      this.mode = 'Edit';
      this.btnText = 'Update Publisher';
    } else {
      this.mode = 'New';
      this.btnText = 'Add New Publisher';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayErrors(name: string) {
    if (this.genreForm.get(name).errors) {
      return this.genreForm.get(name).errors.backend;
    }

    return [];
  }

  clearError() {
    if (this.customError !== '') {
      this.customError = '';
      this.genreForm.controls.name.setErrors(null);
    }
  }

  onSubmit() {
    if (this.mode === 'New') {
      this.service.addNewGenre(this.genreForm.value)
        .subscribe(() => {
          this.dialogRef.close();
        },
          (err: HttpErrorResponse) => {
            if (isErrorResponse(err.error)) {
              if (err.error.errors.Name) {
                this.genreForm.controls.name.setErrors({ backend: err.error.errors.Name });
              }

            } else {
              this.customError = err.error.message;
              this.genreForm.controls.name.setErrors({ invalid: true });
            }
          });
    } else if (this.mode === 'Edit') {
      this.service.editGenre({ ...this.genreForm.value, id: this.data.id })
        .subscribe(() => {
          this.dialogRef.close();
        },
          (err: HttpErrorResponse) => {
            if (isErrorResponse(err.error)) {
              if (err.error.errors.Name) {
                this.genreForm.controls.name.setErrors({ backend: err.error.errors.Name });
              }


            } else {
              this.customError = err.error.message;
              this.genreForm.controls.name.setErrors({ invalid: true });
            }
          });
    }
  }
}
