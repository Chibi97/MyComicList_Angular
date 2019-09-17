import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ComicsService } from '../services/comics.service';
import { Comic, Genre } from '../types/responses';
import { GenresService } from '../services/genres.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, AfterViewInit {
  allComics: Comic[] = [];
  allGenres: Genre[] = [];
  selectedGenres: number[] = [];
  totalCount = 1;
  pageSize = 1;

  constructor(
    private comicService: ComicsService,
    private genreService: GenresService) { }

  ngOnInit() {
    this.getComics();
    this.getGenres();
  }

  ngAfterViewInit(): void {}

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

    this.comicService.getComics(pageNum, 3, filters).subscribe((comics) => {
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

}
