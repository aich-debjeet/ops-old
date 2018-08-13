import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: string, args: string[]): any {
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

}
