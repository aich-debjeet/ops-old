import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchNamePipe implements PipeTransform {
 transform(items: any[], field: string): any[] {
     if (!field) {
        return items;
      } else {
        return items
          .filter(item =>
            item.name.toLowerCase().indexOf(field.toString().toLowerCase()) !== -1
          );
      }
 }
}
