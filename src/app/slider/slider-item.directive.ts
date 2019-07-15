import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSliderItem]'
})
export class SliderItemDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
