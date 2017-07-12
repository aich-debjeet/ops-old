import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInterestComponent } from './register-interest.component';

describe('RegisterInterestComponent', () => {
  let component: RegisterInterestComponent;
  let fixture: ComponentFixture<RegisterInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
