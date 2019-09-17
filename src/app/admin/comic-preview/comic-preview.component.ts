import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from 'src/app/types/responses';

@Component({
  selector: 'app-comic-preview',
  templateUrl: './comic-preview.component.html',
  styleUrls: ['./comic-preview.component.scss']
})
export class ComicPreviewComponent {
  comic: Comic;

  constructor(
    public dialogRef: MatDialogRef<ComicPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comic
  ) {
    this.comic = data;
  }


  onClose(): void {
    this.dialogRef.close();
  }
}
