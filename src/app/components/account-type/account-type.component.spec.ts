import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccTypeComponent } from './acc-type.component';

describe('AccTypeComponent', () => {
  let component: AccTypeComponent;
  let fixture: ComponentFixture<AccTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
