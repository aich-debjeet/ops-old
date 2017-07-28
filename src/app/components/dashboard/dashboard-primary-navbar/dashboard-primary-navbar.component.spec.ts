import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrimaryNavbarComponent } from './dashboard-primary-navbar.component';

describe('DashboardPrimaryNavbarComponent', () => {
  let component: DashboardPrimaryNavbarComponent;
  let fixture: ComponentFixture<DashboardPrimaryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrimaryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrimaryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
