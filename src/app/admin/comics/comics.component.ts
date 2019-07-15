import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';

  constructor() { }

  ngOnInit() {
  }

}
