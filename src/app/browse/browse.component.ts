import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ComicsService } from '../services/comics.service';
import { Comic, Genre } from '../types/responses';
import { GenresService } from '../services/genres.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  allComics: Comic[] = [];
  allGenres: Genre[] = [];
  selectedGenres: number[] = [];
  totalCount = 1;
  pageSize = 1;
  routerSub: any;
  selectedFilter: number;

  constructor(
    private comicService: ComicsService,
    private genreService: GenresService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGenres();
    this.routerSub = this.route.params.subscribe(params => {
      if (params.genreId) {
        this.selectedFilter = +params.genreId;
        this.fetchDataWithSelectedFilter();
      } else {
        this.selectedFilter = null;
        this.getComics();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  getGenres() {
    this.genreService.getGenres().subscribe((genres) => {
      this.allGenres = genres;
    });
  }

  fetchData(event: PageEvent) {
    this.getComics(event.pageIndex + 1);
  }

  getComics(pageNum: number = 1) {
    const filters = [
      {name: 'genres', values: this.selectedGenres},
      // {name: 'name', values: ['Nar']}
    ];

    this.comicService.getComics(pageNum, 6, filters).subscribe((comics) => {
      this.allComics = comics.data;
      this.pageSize = comics.perPage;
      this.totalCount = comics.totalCount;
    });
  }

  selectFilter(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedGenres.push(+event.source.value);
    } else {
      const index = this.selectedGenres.indexOf(+event.source.value);
      if (index !== -1) {
        this.selectedGenres.splice(index, 1);
      }
    }

    this.getComics(1);
  }

  fetchDataWithSelectedFilter() {
    if (this.selectFilter) {
      this.selectedGenres.push(this.selectedFilter);
      this.getComics(1);
    }
  }

  isChecked(genreId: number) {
    if (this.selectedFilter === genreId) {
      return true;
    }
    return false;
  }

}
