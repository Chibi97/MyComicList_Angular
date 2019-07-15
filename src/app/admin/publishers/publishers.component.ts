import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Publisher } from 'src/app/types/responses';
import { PublishersService } from 'src/app/api/publishers.service';
import { MatDialog } from '@angular/material/dialog';
import { PublisherFormComponent } from '../forms/publisher-form/publisher-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Publisher>;
  displayedColumns = ['id', 'name', 'origin', 'actions'];

  constructor(private service: PublishersService,
              public dialog: MatDialog,
              private snack: MatSnackBar) { }

  openDialog() {
    this.dialog.open(PublisherFormComponent, {minWidth: '25rem'})
      .afterClosed().subscribe(this.reloadData.bind(this));
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Publisher>([]);
    this.reloadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deletePublisher(id)
      .subscribe(() => {
        this.snack.open('Successfully deleted', undefined,
          {duration: 2000, verticalPosition: 'top'});
        this.reloadData();
      });
  }

  private reloadData() {
    this.service.getPublishers()
    .subscribe((publishers) => {
      this.dataSource = new MatTableDataSource<Publisher>(publishers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
