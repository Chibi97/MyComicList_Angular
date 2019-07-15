import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  @HostBinding('class') classes = 'f-1-1 d-flex';

  constructor() { }

  ngOnInit() {
  }

}
