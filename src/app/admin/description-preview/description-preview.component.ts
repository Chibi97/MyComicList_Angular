import { Component, OnInit, Inject } from '@angular/core';
import { Comic } from 'src/app/types/responses';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description-preview',
  templateUrl: './description-preview.component.html',
  styleUrls: ['./description-preview.component.scss']
})
export class DescriptionPreviewComponent {
  comic: Comic;

  constructor(
    public dialogRef: MatDialogRef<DescriptionPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comic
  ) {
    this.comic = data;
    console.log(this.comic);
  }


  onClose(): void {
    this.dialogRef.close();
  }

}
