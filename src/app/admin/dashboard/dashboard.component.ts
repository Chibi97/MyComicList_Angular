import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';

  constructor() { }

  ngOnInit() {
  }

}
