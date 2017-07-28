import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfileCoverComponent } from './dashboard-profile-cover.component';

describe('DashboardProfileCoverComponent', () => {
  let component: DashboardProfileCoverComponent;
  let fixture: ComponentFixture<DashboardProfileCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProfileCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProfileCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
