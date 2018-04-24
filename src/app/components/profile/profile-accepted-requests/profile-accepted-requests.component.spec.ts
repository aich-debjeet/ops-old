import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAcceptedRequestsComponent } from './profile-accepted-requests.component';

describe('ProfileAcceptedRequestsComponent', () => {
  let component: ProfileAcceptedRequestsComponent;
  let fixture: ComponentFixture<ProfileAcceptedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAcceptedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAcceptedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
