import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDropdownNotClosableZone]'
})
export class DropdownNotClosableZoneDirective {

  @Input('dropdown-not-closable-zone')
    dropdownNotClosabledZone: boolean;

    constructor(private elementRef: ElementRef) {
    }

    contains(element: HTMLElement) {
        if (this.dropdownNotClosabledZone === false) {
            return false;
        }
        const thisElement: HTMLElement = this.elementRef.nativeElement;
        return thisElement.contains(element);
    }

}
