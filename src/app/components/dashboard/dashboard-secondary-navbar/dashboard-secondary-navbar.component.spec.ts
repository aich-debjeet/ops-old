import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSecondaryNavbarComponent } from './dashboard-secondary-navbar.component';

describe('DashboardSecondaryNavbarComponent', () => {
  let component: DashboardSecondaryNavbarComponent;
  let fixture: ComponentFixture<DashboardSecondaryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSecondaryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSecondaryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
