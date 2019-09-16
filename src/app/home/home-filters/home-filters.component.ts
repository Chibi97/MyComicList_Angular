import { Component, OnInit } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { Genre } from 'src/app/types/responses';

@Component({
  selector: 'app-home-filters',
  templateUrl: './home-filters.component.html',
  styleUrls: ['./home-filters.component.scss']
})
export class HomeFiltersComponent implements OnInit {
  genres: Genre[];
  constructor(private genreService: GenresService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe((response) => {
      this.genres = response;
    });
  }

}
