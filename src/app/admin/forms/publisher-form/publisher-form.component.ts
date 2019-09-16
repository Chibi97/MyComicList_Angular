import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'src/app/types/responses';
import { FormBuilder, Validators } from '@angular/forms';
import { PublishersService } from 'src/app/services/publishers.service';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss']
})
export class PublisherFormComponent {
  publisherForm = this.fb.group({
    name: ['', Validators.required],
    origin: ['', Validators.required]
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

  onSubmit() {
    if (this.mode === 'New') {
      this.service.addNewPublisher(this.publisherForm.value)
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else if (this.mode === 'Edit') {
      this.service.editPublisher({...this.publisherForm.value, id: this.data.id})
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }
}
