import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: Array<any>, args?: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      console.log('value',value);
      console.log('prev', prev,'cur' ,cur)
      if(!prev[cur[args]]) {
        prev[cur[args]] = [cur];
      } else {
        prev[cur[args]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }

}
