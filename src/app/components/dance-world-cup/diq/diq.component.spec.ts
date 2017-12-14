import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiqComponent } from './diq.component';

describe('DiqComponent', () => {
  let component: DiqComponent;
  let fixture: ComponentFixture<DiqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
