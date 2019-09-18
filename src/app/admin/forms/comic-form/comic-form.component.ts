import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
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
    name: [''],
    issues: [''],
    description: [''],
    authors: [[]],
    genres: [[]],
    publisher: ['']
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
