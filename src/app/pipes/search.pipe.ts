import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
     if (!field){
       console.log(items);
        return items;
      } else {
        console.log('field'+field);
        return items
          .filter(item =>
          item.name.toLowerCase().indexOf(field.toString().toLowerCase()) !== -1
          );
      }
 }
}
