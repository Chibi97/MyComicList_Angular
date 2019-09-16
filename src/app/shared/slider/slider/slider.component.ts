import { Component, ContentChildren, QueryList, ViewChildren, ElementRef, AfterViewInit,
   Input, ViewChild, HostListener, OnInit, AfterContentInit } from '@angular/core';
import { SliderItemDirective } from '../slider-item.directive';
import { AnimationBuilder, animate, style, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(SliderItemDirective) items: QueryList<SliderItemDirective>;
  @ViewChildren('li') itemElements: QueryList<ElementRef>;
  @ViewChild('slider', { static: true }) slider: ElementRef;
  @Input() timing = '500ms ease-in';
  @Input() showControls = true;

  constructor(private builder: AnimationBuilder) { }

  itemWidth = 0;
  calculated = { 'max-width': '' };
  currentSlide = 0;
  player: AnimationPlayer;
  interval: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.recalculateBounds();
  }

  ngAfterContentInit() {
    this.interval =
      setInterval( () => {
        this.next();
      }, 4000);
  }

  ngAfterViewInit() {
    this.itemElements.changes.subscribe(() => {
      this.recalculateBounds();
    });
  }

  recalculateBounds() {
    setTimeout(() => {
      const itemWidth = this.itemElements.first.nativeElement.getBoundingClientRect().width;
      this.calculated['max-width'] = `${itemWidth}px`;
      this.itemWidth = itemWidth;
    });
  }

  buildAnimation(offset: number) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  next() {
    clearInterval(this.interval);
    this.currentSlide++;
    if (this.currentSlide > this.items.length - 1) {
      this.currentSlide = 0;
    }
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation = this.buildAnimation(offset);
    this.player = myAnimation.create(this.slider.nativeElement);
    this.player.play();
    this.interval =
      setInterval(() => {
        this.next();
      }, 4000);
  }

  prev() {
    clearInterval(this.interval);
    this.currentSlide--;
    if (this.currentSlide < 0) {
      this.currentSlide = this.items.length - 1;
    }

    const offset = this.currentSlide * this.itemWidth;
    const myAnimation = this.buildAnimation(offset);
    this.player = myAnimation.create(this.slider.nativeElement);
    this.player.play();
    this.interval =
      setInterval(() => {
        this.next();
      }, 4000);
  }
}
