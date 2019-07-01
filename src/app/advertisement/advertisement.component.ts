import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @Input() showMessage = false;
  constructor() { }

  ngOnInit() {
  }

}
