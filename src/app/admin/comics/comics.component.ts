import { ComicFormComponent } from './../forms/comic-form/comic-form.component';
import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Comic } from 'src/app/types/responses';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComicsService } from 'src/app/services/comics.service';
import { ComicsDataSource } from './comics-data-source';
import { ComicPreviewComponent } from '../comic-preview/comic-preview.component';
import { rowsAnimation } from '../../shared/animations/index';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
  animations: [rowsAnimation]
})
export class ComicsComponent implements OnInit, AfterViewInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: ComicsDataSource;
  displayedColumns = ['id', 'imageIcon', 'name', 'description', 'issues', 'actions'];

  constructor(private service: ComicsService,
              public imgDialog: MatDialog,
              public formDialog: MatDialog,
              private snack: MatSnackBar) { }

  openImageDialog(comic: Comic) {
    this.imgDialog.open(ComicPreviewComponent, {data: comic, width: '40rem'});
  }

  openFormDialog() {
    this.formDialog.open(ComicFormComponent, {width: '40rem'});
  }

  ngOnInit() {
    this.dataSource = new ComicsDataSource(this.service);
    this.dataSource.loadComics();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .subscribe(() => {
        this.dataSource.loadComics(this.paginator.pageIndex + 1, this.paginator.pageSize);
      });
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteComic(id)
      .subscribe(() => {
        this.snack.open('Successfully deleted', undefined,
          { duration: 2000, verticalPosition: 'top' });
        this.dataSource.loadComics(this.paginator.pageIndex + 1, this.paginator.pageSize);
      });
  }

  // private reloadData() {
  //   this.service.getPublishers()
  //     .subscribe((publishers) => {
  //       this.dataSource = new MatTableDataSource<Comic>(publishers);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     });
  // }

}
