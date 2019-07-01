import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <header class='flex-col'>
      <app-navbar></app-navbar>
    </header>
    <app-slider></app-slider>
    <app-advertisement></app-advertisement>
    <app-footer></app-footer>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
