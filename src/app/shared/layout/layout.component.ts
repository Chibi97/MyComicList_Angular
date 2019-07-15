import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex f-col';

  constructor() { }

  ngOnInit() {
  }

}
