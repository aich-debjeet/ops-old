import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetEventsComponent } from './dashboard-widget-events.component';

describe('DashboardWidgetEventsComponent', () => {
  let component: DashboardWidgetEventsComponent;
  let fixture: ComponentFixture<DashboardWidgetEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
