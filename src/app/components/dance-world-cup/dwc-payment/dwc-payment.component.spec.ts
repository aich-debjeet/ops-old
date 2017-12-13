import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcPaymentComponent } from './dwc-payment.component';

describe('DwcPaymentComponent', () => {
  let component: DwcPaymentComponent;
  let fixture: ComponentFixture<DwcPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
