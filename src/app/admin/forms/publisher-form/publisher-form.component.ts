import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'src/app/types/responses';
import { FormBuilder, Validators } from '@angular/forms';
import { PublishersService } from 'src/app/services/publishers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { isErrorResponse } from 'src/app/types/utils';
import { validateRegex } from 'src/app/shared/validators/regex.directive';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss']
})
export class PublisherFormComponent {
  customError = '';
  publisherForm = this.fb.group({
    name: ['', [Validators.required, validateRegex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]],
    origin: ['', [Validators.required, validateRegex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/)]]
  });

  btnText: string;
  mode: 'Edit'|'New';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PublisherFormComponent>,
    private service: PublishersService,
    @Inject(MAT_DIALOG_DATA) private data: Publisher
  ) {
    if (data) {
      this.publisherForm.setValue({
        name: data.name,
        origin: data.origin
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
    if (this.publisherForm.get(name).errors) {
      return this.publisherForm.get(name).errors.backend;
    }

    return [];
  }

  clearError() {
    if (this.customError !== '') {
      this.customError = '';
      this.publisherForm.controls.name.setErrors(null);
      this.publisherForm.controls.origin.setErrors(null);
    }
  }

  onSubmit() {
    if (this.mode === 'New') {
      this.service.addNewPublisher(this.publisherForm.value)
        .subscribe(() => {
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          if (isErrorResponse(err.error)) {
            if (err.error.errors.Name) {
            this.publisherForm.controls.name.setErrors({ backend: err.error.errors.Name });
            }

            if (err.error.errors.Origin) {
              this.publisherForm.controls.origin.setErrors({ backend: err.error.errors.Origin });
            }

          } else {
            this.customError = err.error.message;
            this.publisherForm.controls.name.setErrors({ invalid: true });
            this.publisherForm.controls.origin.setErrors({ invalid: true });
          }
        });
    } else if (this.mode === 'Edit') {
      this.service.editPublisher({...this.publisherForm.value, id: this.data.id})
        .subscribe(() => {
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          if (isErrorResponse(err.error)) {
            if (err.error.errors.Name) {
              this.publisherForm.controls.name.setErrors({ backend: err.error.errors.Name });
            }

            if (err.error.errors.Origin) {
              this.publisherForm.controls.origin.setErrors({ backend: err.error.errors.Origin });
            }

          } else {
            this.customError = err.error.message;
            this.publisherForm.controls.name.setErrors({ invalid: true });
            this.publisherForm.controls.origin.setErrors({ invalid: true });
          }
        });
    }
  }
}
