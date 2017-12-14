import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventActions } from 'app/actions/event.action';

@Component({
  selector: 'app-dwc-payment',
  templateUrl: './dwc-payment.component.html',
  styleUrls: ['./dwc-payment.component.scss']
})
export class DwcPaymentComponent implements OnInit, AfterViewInit {
  dwcState$: any;
  dataState: any;
  constructor(
    private elementRef: ElementRef,
    private store: Store<any>,
  ) {
    this.dwcState$ = this.store.select('eventTags');
    this.dwcState$.subscribe(state => {
      this.dataState = state
    });

    this.store.dispatch({ type: EventActions.DWC_PAYMENT_REQUEST });
   }

  ngOnInit() {
     this.loadScript();
  }

  ngAfterViewInit() {

  }

 Payment(value) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = "Instamojo.open('" + value + "');";
    this.elementRef.nativeElement.appendChild(s);
 }

  loadScript() {
    const a = document.createElement('script');
    a.src = 'https://js.instamojo.com/v1/checkout.js';
    this.elementRef.nativeElement.appendChild(a);
  }

}
