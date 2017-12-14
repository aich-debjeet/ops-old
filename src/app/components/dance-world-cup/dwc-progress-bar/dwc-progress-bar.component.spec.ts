import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwcProgressBarComponent } from './dwc-progress-bar.component';

describe('DwcProgressBarComponent', () => {
  let component: DwcProgressBarComponent;
  let fixture: ComponentFixture<DwcProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwcProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwcProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
