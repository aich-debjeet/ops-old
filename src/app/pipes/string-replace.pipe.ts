import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'strReplace'
})

export class StringReplacePipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        return value.replace(args[0], args[1]);
    }

}

// example
// strReplace:['agr to replace with', 'arg to replace by']
