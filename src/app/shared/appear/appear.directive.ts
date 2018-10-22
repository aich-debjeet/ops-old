import { Directive, AfterViewInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[appAppear]'
})
export class AppearDirective implements AfterViewInit, OnDestroy {
  @Output() reached: EventEmitter<void>;
  @Output() departed: EventEmitter<void>;

  elementPos: number;
  elementHeight: number;

  scrollPos: number;
  windowHeight: number;

  subscriptionScroll: Subscription;
  subscriptionResize: Subscription;

  constructor(private element: ElementRef) {
    this.reached = new EventEmitter<void>();
    this.departed = new EventEmitter<void>();
  }

  saveDimensions() {
    this.elementPos = this.getOffsetTop(this.element.nativeElement);
    this.elementHeight = this.element.nativeElement.offsetHeight;
    this.windowHeight = window.innerHeight;
  }

  saveScrollPos() {
    this.scrollPos = window.scrollY;
  }

  getOffsetTop(element: any) {
    let offsetTop = element.offsetTop || 0;
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }

  checkVisibility() {
    if (this.hasReached()) {
      // double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if (this.hasReached()) {
        this.reached.emit();
        // console.log('reached');
      }
      if (this.hasDeparted()) {
        this.departed.emit();
        this.unsubscribe();
        // console.log('departed');
      }
    }
  }

  hasReached() {
    // const reached = this.scrollPos >= this.elementPos || (this.scrollPos + this.windowHeight) >= (this.elementPos + this.elementHeight);
    const reached = (this.scrollPos + this.windowHeight) >= (this.elementPos + this.elementHeight);
    return reached;
  }

  hasDeparted() {
    const departed = this.scrollPos >= (this.elementPos + this.elementHeight);
    return departed;
  }

  subscribe() {
    this.subscriptionScroll = Observable.fromEvent(window, 'scroll').startWith(null)
      .debounceTime(10)
      .subscribe(() => {
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = Observable.fromEvent(window, 'resize').startWith(null)
      .debounceTime(10)
      .subscribe(() => {
        this.saveDimensions();
        this.checkVisibility();
      });
  }

  unsubscribe() {
    if (this.subscriptionScroll) {
      this.subscriptionScroll.unsubscribe();
    }
    if (this.subscriptionResize) {
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
