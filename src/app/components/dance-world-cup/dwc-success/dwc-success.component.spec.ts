import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcSuccessComponent } from './dwc-success.component';

describe('DwcSuccessComponent', () => {
  let component: DwcSuccessComponent;
  let fixture: ComponentFixture<DwcSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
