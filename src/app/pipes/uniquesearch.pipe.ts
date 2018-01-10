import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchunique'
})

@Injectable()
export class SearchUniquePipe implements PipeTransform {
 transform(items: any[], field: string, query): any[] {
    if (! query) {
        return items;
    } else {
        console.log(items)
    return items.filter(item =>
        item[field].toLowerCase().indexOf(query.toString().toLowerCase()) !== -1
    );
    }
 }
}
