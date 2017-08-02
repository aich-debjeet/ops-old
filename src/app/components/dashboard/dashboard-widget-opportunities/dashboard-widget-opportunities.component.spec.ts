import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetOpportunitiesComponent } from './dashboard-widget-opportunities.component';

describe('DashboardWidgetOpportunitiesComponent', () => {
  let component: DashboardWidgetOpportunitiesComponent;
  let fixture: ComponentFixture<DashboardWidgetOpportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
