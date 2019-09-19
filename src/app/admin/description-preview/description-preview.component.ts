import { Component, OnInit, Inject } from '@angular/core';
import { Comic } from 'src/app/types/responses';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-description-preview',
  templateUrl: './description-preview.component.html',
  styleUrls: ['./description-preview.component.scss']
})
export class DescriptionPreviewComponent {
  comic: Comic;
  date: any;

  constructor(
    public dialogRef: MatDialogRef<DescriptionPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comic
  ) {
    this.comic = data;
    // this.date = moment(this.comic.publishedAt).format('MMMM Do YYYY');
  }


  onClose(): void {
    this.dialogRef.close();
  }

}
