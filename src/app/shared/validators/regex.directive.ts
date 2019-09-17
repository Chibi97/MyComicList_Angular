import { AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';


@Directive({
  selector: '[appRegex]'
})

export class RegexDirective {

  constructor() { }

}

export function validateRegex(nameRe: RegExp): any {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = nameRe.test(control.value);
    return result ? null : { regex: { value: control.value } };
  };
}
