import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Comic } from 'src/app/types/responses';
import { PublishersService } from 'src/app/services/publishers.service';
import { MatDialog } from '@angular/material/dialog';
import { PublisherFormComponent } from '../forms/publisher-form/publisher-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Comic>;
  displayedColumns = ['id', 'image', 'name', 'description', 'issues', 'authors', 'genres', 'publisher'];

  constructor(private service: ComicsService,
              public dialog: MatDialog,
              private snack: MatSnackBar) { }

  openDialog() {
    // this.dialog.open(PublisherFormComponent, { minWidth: '25rem' })
    //  .afterClosed().subscribe(this.reloadData.bind(this));
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Comic>([]);
    // this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // delete(id: number) {
  //   this.service.deletePublisher(id)
  //     .subscribe(() => {
  //       this.snack.open('Successfully deleted', undefined,
  //         { duration: 2000, verticalPosition: 'top' });
  //       this.reloadData();
  //     });
  // }

  // private reloadData() {
  //   this.service.getPublishers()
  //     .subscribe((publishers) => {
  //       this.dataSource = new MatTableDataSource<Comic>(publishers);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     });
  // }

}
