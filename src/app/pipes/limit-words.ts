import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'limitWords'})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, numWords: number): string {
    const words = value.split(' ');
    const visible = [];

    for (let i = 0; i < numWords && i < words.length; i++) {
      visible.push(words[i]);
    }

    return visible.join(' ');
  }
}
