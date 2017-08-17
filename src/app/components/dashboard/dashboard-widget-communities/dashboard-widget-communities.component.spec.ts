import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetCommunitiesComponent } from './dashboard-widget-communities.component';

describe('DashboardWidgetCommunitiesComponent', () => {
  let component: DashboardWidgetCommunitiesComponent;
  let fixture: ComponentFixture<DashboardWidgetCommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
