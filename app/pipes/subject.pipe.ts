import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'subjectConvert'})
export class subjectConvert implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return value.replace(".", function(txt) {
        return " ";
    });
  }
}