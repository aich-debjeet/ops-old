import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'firstCharCaps'
})

export class FirstCharCapsPipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        value = value.toLowerCase();
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

}

// example
// strReplace:['agr to replace with', 'arg to replace by']
