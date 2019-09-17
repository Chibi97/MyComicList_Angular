import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'limitWords'})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, length: number): string {
    let visible = '';

    for (let i = 0; i < length && i < value.length; i++) {
      visible += value.charAt(i);
    }

    return visible;
  }
}
