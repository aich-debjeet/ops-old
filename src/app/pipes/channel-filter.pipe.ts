import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'channelFilter'
})
export class ChannelFilterPipe implements PipeTransform {

  transform(items: any[], field: string): any[] {
    if (!field) {
       return items;
     } else {
       return items
         .filter(item =>
           item.spotfeedName.toLowerCase().indexOf(field.toString().toLowerCase()) !== -1
         );
     }
  }
}
