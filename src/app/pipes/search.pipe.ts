import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field: string): any[] {
     if (!field) {
        return items;
      } else {
        console.log('field' + field);
        return items
          .filter(item =>
            item.name.toLowerCase().indexOf(field.toString().toLowerCase()) !== -1
          );
      }
 }
}
