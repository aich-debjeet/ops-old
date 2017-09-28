import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash';

@Pipe({
  name: 'unique',
  pure: false
})

export class UniquePipe implements PipeTransform {
    transform(value: any): any {
      if (value !== undefined && value !== null) {
          return uniqBy(value, 'ownerImage');
      }
      return value;
    }
}
