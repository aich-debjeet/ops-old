import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetProjectsComponent } from './dashboard-widget-projects.component';

describe('DashboardWidgetProjectsComponent', () => {
  let component: DashboardWidgetProjectsComponent;
  let fixture: ComponentFixture<DashboardWidgetProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
