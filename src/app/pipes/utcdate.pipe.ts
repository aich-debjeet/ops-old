import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'utcDate'
})
export class UtcDatePipe implements PipeTransform {

  transform(value: string): any {

    if (!value) {
      return '';
    }

    const date = moment.utc(value).local().format();
    return date;
  }
}
