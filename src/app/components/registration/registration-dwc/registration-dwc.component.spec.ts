import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDwcComponent } from './registration-dwc.component';

describe('RegistrationDwcComponent', () => {
  let component: RegistrationDwcComponent;
  let fixture: ComponentFixture<RegistrationDwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationDwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
