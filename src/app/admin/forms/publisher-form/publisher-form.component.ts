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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PublisherFormComponent>,
    private service: PublishersService,
    @Inject(MAT_DIALOG_DATA) private data: Publisher
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.service.addNewPublisher(this.publisherForm.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
