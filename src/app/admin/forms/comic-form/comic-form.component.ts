import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.scss']
})
export class ComicFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComicFormComponent>
  ) { }

  comicForm = this.fb.group({
    name: ['', Validators.required],
    issues: ['', Validators.required],
    description: ['', Validators.required],
    authors: [[], Validators.required],
    genres: [[], Validators.required],
    publisher: ['', Validators.required]
  });

  btnText = 'Add New Comic';
  imgUrl: string;

  ngOnInit() {}

  onUploadClick(fileInputRef: HTMLInputElement) {
    fileInputRef.click();
  }

  preview(files: File[]) {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
