import { Component, OnInit } from '@angular/core';
import { ComicsService } from 'src/app/services/comics.service';
import { Comic } from 'src/app/types/responses';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  items: Comic[] = [];
  screenWidth: any;

  constructor(private service: ComicsService) { }

  ngOnInit() {
    this.service.getComics().subscribe((comics) => {
      this.items = comics.data;
    });
  }

  getImage(comic: Comic) {
    return `url(${comic.pictures[0]})`;
  }

}
