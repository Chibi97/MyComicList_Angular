import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../services/comics.service';
import { Comic, Genre } from '../types/responses';
import { GenresService } from '../services/genres.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  allComics: Comic[] = [];
  allGenres: Genre[] = [];
  pagiLength = 1;
  pageSize = 1;
  constructor(private comicService: ComicsService, private genreService: GenresService) { }

  ngOnInit() {
    this.getComics();
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe((genres) => {
      this.allGenres = genres;
    });
  }

  getComics() {
    this.comicService.getComics().subscribe((comics) => {
      this.allComics = comics.data;
      this.pagiLength = comics.totalCount;
      this.pageSize = comics.perPage;
    });
  }

}
