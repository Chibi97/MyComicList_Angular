import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';

  constructor() { }

  ngOnInit() {
  }

}
