import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNetworkRequestsComponent } from './profile-network-requests.component';

describe('ProfileNetworkRequestsComponent', () => {
  let component: ProfileNetworkRequestsComponent;
  let fixture: ComponentFixture<ProfileNetworkRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNetworkRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNetworkRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
