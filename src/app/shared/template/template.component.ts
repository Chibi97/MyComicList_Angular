import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  template: `
    <header class='flex-col'>
      <app-navbar></app-navbar>
    </header>
    <ng-content></ng-content>
    <app-footer></app-footer>
  `,
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
