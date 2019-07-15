import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../api/comics.service';
import { Comic } from '../types/responses';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  allComics: Comic[] = [];
  constructor(private service: ComicsService) { }

  ngOnInit() {
    this.getComics();
  }

  getComics() {
    this.service.getComics().subscribe((comics) => {
      this.allComics = comics.data;
    });
  }

}
