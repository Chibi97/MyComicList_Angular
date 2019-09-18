import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorWrite, AuthorRead } from 'src/app/types/responses';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthorFormComponent } from '../forms/author-form/author-form.component';
import { rowsAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  animations: [
    rowsAnimation
  ]
})
export class AuthorsComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<AuthorRead>;
  displayedColumns = ['id', 'fullName', 'actions'];

  constructor(private service: AuthorsService, public dialog: MatDialog, private snack: MatSnackBar) {
  }

  openDialog(mode: 'new' | 'edit', data: AuthorWrite = null) {
    let dialogRef: MatDialogRef<AuthorFormComponent, any>;
    if (mode === 'new') {
      dialogRef = this.dialog.open(AuthorFormComponent, { minWidth: '25rem' });
    } else {
      dialogRef = this.dialog.open(AuthorFormComponent, { data });
    }

    dialogRef
      .afterClosed()
      .subscribe(this.reloadData.bind(this));
  }

  addNew() {
    this.openDialog('new');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<AuthorRead>([]);
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteAuthor(id)
      .subscribe(() => {
        this.snack.open('Successfully deleted', undefined,
          { duration: 2000, verticalPosition: 'top' });
        this.reloadData();
      });
  }

  edit(author: AuthorWrite) {
    this.openDialog('edit', author);
  }

  private reloadData() {
    this.service.getAuthors()
      .subscribe((authors) => {
        this.dataSource = new MatTableDataSource<AuthorRead>(authors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

}
