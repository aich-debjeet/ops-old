import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetCalendarComponent } from './dashboard-widget-calendar.component';

describe('DashboardWidgetCalendarComponent', () => {
  let component: DashboardWidgetCalendarComponent;
  let fixture: ComponentFixture<DashboardWidgetCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
