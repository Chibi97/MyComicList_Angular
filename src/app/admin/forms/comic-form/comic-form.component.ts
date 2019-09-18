import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
