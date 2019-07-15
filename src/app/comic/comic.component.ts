import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../types/responses';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit {
  @Input() comic: Comic;

  constructor() {}

  ngOnInit() {}
}
