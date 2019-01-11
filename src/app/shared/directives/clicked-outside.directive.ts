import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {

  @Output() public clickOutside = new EventEmitter();

  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }

}
