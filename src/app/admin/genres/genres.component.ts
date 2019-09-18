import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from 'src/app/types/responses';
import { GenresService } from 'src/app/services/genres.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreFormComponent } from '../forms/genre-form/genre-form.component';
import { rowsAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [
    rowsAnimation
  ]
})
export class GenresComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Genre>;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private service: GenresService, public dialog: MatDialog, private snack: MatSnackBar) {
  }

  openDialog(mode: 'new' | 'edit', data: Genre = null) {
    let dialogRef: MatDialogRef<GenreFormComponent, any>;
    if (mode === 'new') {
      dialogRef = this.dialog.open(GenreFormComponent, { minWidth: '25rem' });
    } else {
      dialogRef = this.dialog.open(GenreFormComponent, { data });
    }

    dialogRef
      .afterClosed()
      .subscribe(this.reloadData.bind(this));
  }

  addNew() {
    this.openDialog('new');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Genre>([]);
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteGenre(id)
      .subscribe(() => {
        this.snack.open('Successfully deleted', undefined,
          { duration: 2000, verticalPosition: 'top' });
        this.reloadData();
      });
  }

  edit(genre: Genre) {
    this.openDialog('edit', genre);
  }

  private reloadData() {
    this.service.getGenres()
      .subscribe((genres) => {
        this.dataSource = new MatTableDataSource<Genre>(genres);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }



}
