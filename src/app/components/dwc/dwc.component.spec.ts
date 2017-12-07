import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcComponent } from './dwc.component';

describe('DwcComponent', () => {
  let component: DwcComponent;
  let fixture: ComponentFixture<DwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
