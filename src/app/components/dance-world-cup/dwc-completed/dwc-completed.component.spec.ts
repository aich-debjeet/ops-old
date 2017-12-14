import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcCompletedComponent } from './dwc-completed.component';

describe('DwcCompletedComponent', () => {
  let component: DwcCompletedComponent;
  let fixture: ComponentFixture<DwcCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
